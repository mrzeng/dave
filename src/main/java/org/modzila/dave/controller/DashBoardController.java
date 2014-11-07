package org.modzila.dave.controller;

import org.modzila.dave.bo.UUIDBo;
import org.modzila.dave.dao.DashBoardDao;
import org.modzila.dave.dao.WidgetDao;
import org.modzila.dave.model.DashBoard;
import org.modzila.dave.model.Result;
import org.modzila.dave.model.Widget;
import org.modzila.dave.model.WidgetFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/api/dashboard/{path}")
public class DashBoardController {

    @Autowired
    @Qualifier("dashboardLocalXmlDao")
    private DashBoardDao dashboardDao;

    @Autowired
    @Qualifier("widgetLocalXmlDao")
    private WidgetDao widgetDao;

    @Autowired
    private UUIDBo uuidBo;

    private static final Logger LOG = LoggerFactory.getLogger(DashBoardController.class);

    @RequestMapping(value = "/layout", method = RequestMethod.GET)
    @ResponseBody
    public Result getWidgets(@PathVariable String path) {
        try {
            DashBoard dashboard = dashboardDao.load(path);
            return new Result(dashboard.getWidgets());
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "/layout/{widgetId}/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateWidgets(@PathVariable String path,
            @PathVariable String widgetId,
            @RequestParam("width") String width) {
        try {
            DashBoard dashboard = dashboardDao.load(path);
            dashboard.updateWidget(widgetId, width);
            dashboardDao.dump(dashboard, path);
            return new Result();
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "/widget/add", method = RequestMethod.POST)
    @ResponseBody
    public synchronized Result addWidget(@PathVariable String path,
            @RequestParam("type") String type,
            @RequestParam("width") String width) {
        try {
            DashBoard dashboard = dashboardDao.load(path);
            String id = uuidBo.generate();
            dashboard.addWidget(id, width, type);
            dashboardDao.dump(dashboard, path);
            Widget widget = WidgetFactory.create(type);
            widgetDao.dump(widget, id);
            return new Result(id);
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "/widget/{widgetId}/remove", method = RequestMethod.POST)
    @ResponseBody
    public Result removeWidget(@PathVariable String path,
            @PathVariable String widgetId) {
        try {
            DashBoard dashboard = dashboardDao.load(path);
            dashboard.removeWidget(widgetId);
            dashboardDao.dump(dashboard, path);
            widgetDao.remove(widgetId);
            return new Result();
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }
}
