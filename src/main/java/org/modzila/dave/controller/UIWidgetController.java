package org.modzila.dave.controller;

import org.modzila.dave.dao.UIWidgetDao;
import org.modzila.dave.model.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/api/ui-widget")
public class UIWidgetController {

    @Autowired
    private UIWidgetDao uiWidgetDao;

    private static final Logger LOG = LoggerFactory.getLogger(UIWidgetController.class);

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Result list() {
        try {
            return new Result(uiWidgetDao.list());
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }
}
