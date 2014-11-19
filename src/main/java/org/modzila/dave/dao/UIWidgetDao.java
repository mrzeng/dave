package org.modzila.dave.dao;

import java.util.List;
import org.modzila.dave.model.UIWidget;

/**
 *
 * @author yanshuai
 */
public interface UIWidgetDao {
    
    public List<UIWidget> list() throws Exception;
}
