package org.modzila.dave.controller;

import org.modzila.dave.dao.PathDao;
import org.modzila.dave.model.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/api/path")
public class PathController {

    @Autowired
    @Qualifier("pathLocalXmlDao")
    private PathDao pathDao;

    private static final Logger LOG = LoggerFactory.getLogger(PathController.class);

    @RequestMapping(value = "/root", method = RequestMethod.GET)
    @ResponseBody
    public Result getRoot() {
        try {
            return new Result(pathDao.getRoot());
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }

    @RequestMapping(value = "/next", method = RequestMethod.GET)
    @ResponseBody
    public Result getSubPath(@RequestParam(value = "path") String path) {
        try {
            return new Result(pathDao.getSubPath(path));
        } catch (Exception ex) {
            LOG.error("Exception:", ex);
            return new Result(true, String.valueOf(ex));
        }
    }
}
