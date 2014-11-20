package org.modzila.dave.controller;

import org.modzila.dave.annotation.DateRange;
import org.modzila.dave.bo.DbQueryBo;
import org.modzila.dave.bo.KettleQueryBo;
import org.modzila.dave.dao.WidgetDao;
import org.modzila.dave.model.ChartWidget;
import org.modzila.dave.model.ChartWidgetEditor;
import org.modzila.dave.model.JDateRange;
import org.modzila.dave.model.Result;
import org.modzila.dave.model.TableWidget;
import org.modzila.dave.model.TableWidgetEditor;
import org.modzila.dave.model.Widget;
import org.modzila.dave.model.WidgetEditor;
import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import org.apache.commons.io.FileUtils;
import org.modzila.dave.ConfigurationBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping(value = "/api/widget")
public class WidgetController {

    @Autowired
    @Qualifier("widgetLocalXmlDao")
    private WidgetDao widgetDao;

    @Autowired
    private DbQueryBo queryBo;

    @Autowired
    private KettleQueryBo kettleQueryBo;

    @Autowired
    private ConfigurationBean config;

    private static final Logger LOG = LoggerFactory.getLogger(WidgetController.class);

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(TableWidget.class, new TableWidgetEditor());
        binder.registerCustomEditor(ChartWidget.class, new ChartWidgetEditor());
        binder.registerCustomEditor(Widget.class, new WidgetEditor());
    }

    @RequestMapping(value = "/data", method = RequestMethod.GET)
    @ResponseBody
    public Result getData(@RequestParam("widget") Widget widget,
            @RequestParam("path") String path,
            @DateRange @RequestParam("daterange") JDateRange dateRange) {
        try {
            Object[][] data = loadData(widget, path, dateRange);
            return new Result(data);
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "/{widgetId}/data", method = RequestMethod.GET)
    @ResponseBody
    public Result getData(@PathVariable String widgetId,
            @RequestParam("path") String path,
            @DateRange @RequestParam("daterange") JDateRange dateRange) {
        try {
            Widget widget = widgetDao.load(widgetId);
            Object[][] data = loadData(widget, path, dateRange);
            return new Result(data);
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "/{widgetId}/config", method = RequestMethod.GET)
    @ResponseBody
    public Result getConfig(@PathVariable String widgetId) {
        try {
            return new Result(widgetDao.load(widgetId));
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "/{widgetId}/table/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateTableConfig(@PathVariable String widgetId,
            @RequestParam("widget") TableWidget widget,
            @RequestParam("path") String path,
            @DateRange @RequestParam("daterange") JDateRange dateRange) {
        try {
            Widget widget0 = widgetDao.load(widgetId);
            widget.setKettle(widget0.getKettle());
            widgetDao.dump(widget, widgetId);
            Object[][] data = loadData(widget, path, dateRange);
            return new Result(data);
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "/{widgetId}/chart/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateChartConfig(@PathVariable String widgetId,
            @RequestParam("widget") ChartWidget widget,
            @RequestParam("path") String path,
            @DateRange @RequestParam("daterange") JDateRange dateRange) {
        try {
            Widget widget0 = widgetDao.load(widgetId);
            widget.setKettle(widget0.getKettle());
            widgetDao.dump(widget, widgetId);
            Object[][] data = loadData(widget, path, dateRange);
            return new Result(data);
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "/{widgetId}/kettle/upload", method = RequestMethod.POST)
    @ResponseBody
    public Result uploadKettle(@PathVariable String widgetId,
            @RequestParam("file") MultipartFile file) {
        try {
            String filename = file.getOriginalFilename();
            File f = new File(config.getKettleHome(), filename);
            FileUtils.writeByteArrayToFile(f, file.getBytes());
            Widget widget = widgetDao.load(widgetId);
            widget.setDatasource("Kettle");
            widget.setKettle(filename);
            widgetDao.dump(widget, widgetId);
            return new Result();
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    private Object[][] loadData(Widget widget, String path, JDateRange dateRange) throws Exception {
        Map<String, String> env = new HashMap<String, String>();
        env.put("team_full_path", path);
        env.put("start_date", dateRange.getStartDate());
        env.put("end_date", dateRange.getEndDate());

        if ("Kettle".equals(widget.getDatasource())) {
            String ktr = String.format("%s/%s", config.getKettleHome(), widget.getKettle());
            return kettleQueryBo.query(ktr, env);
        } else {
            String sql = widget.getSql();
            for (String key : env.keySet()) {
                String value = env.get(key);
                sql = loadValueWithContext(sql, key, value);
            }
            return queryBo.query(widget.getDatasource(), widget.getHostname(),
                    widget.getPort(), widget.getUsername(), widget.getPassword(), sql);
        }
    }

    private String loadValueWithContext(String v, String key, String value) throws Exception {
        if (null == v) {
            return null;
        }
        String param = String.format("\\$\\{%s\\}", key);
        return v.replaceAll(param, Matcher.quoteReplacement(value));
    }
}
