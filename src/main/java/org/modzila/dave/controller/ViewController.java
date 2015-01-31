package org.modzila.dave.controller;

import java.security.Principal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/view", method = RequestMethod.GET)
public class ViewController {

    @RequestMapping(value = "/dashboard/{id}", method = RequestMethod.GET)
    public String view(ModelMap model, Principal principal) {
        return "view";
    }
}
