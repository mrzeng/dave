package org.modzila.dave.controller;

import java.security.Principal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author yanshuai
 */
@Controller
@RequestMapping(value = "/edit")
public class EditorController {

    @RequestMapping(value = "/dashboard/{id}", method = RequestMethod.GET)
    public String edit(ModelMap model, Principal principal) {
        return "edit";
    }
}
