package org.modzila.dave.bo;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.pentaho.di.core.KettleEnvironment;
import org.pentaho.di.core.Result;
import org.pentaho.di.core.RowMetaAndData;
import org.pentaho.di.core.row.ValueMetaInterface;
import org.pentaho.di.trans.Trans;
import org.pentaho.di.trans.TransMeta;
import org.springframework.stereotype.Component;

@Component
public class KettleQueryBo {

    public Object[][] query(String kettle, Map<String, String> env) throws Exception {
        File ktr = new File(kettle);
        KettleEnvironment.init();
        TransMeta transMeta = new TransMeta(ktr.getAbsolutePath());
        Trans trans = new Trans(transMeta);
        List<String> args = new ArrayList<String>();
        if (null != env) {
            args.add(env.get("team_full_path"));
            args.add(env.get("start_date"));
            args.add(env.get("end_date"));
        }
        trans.execute(args.toArray(new String[0]));
        trans.waitUntilFinished();
        int rc = trans.getErrors();
        if (0 < rc) {
            throw new RuntimeException(String.format("执行转换出错: %d", rc));
        }
        Result result = trans.getResult();
        List<RowMetaAndData> rows = result.getRows();
        if (null == rows || rows.isEmpty()) {
            return null;
        }
        List<ValueMetaInterface> valueMetas = rows.get(0).getRowMeta().getValueMetaList();
        Object[][] obj = new Object[rows.size() + 1][valueMetas.size()];
        for (int i = 0; i < obj[0].length; ++i) {
            obj[0][i] = valueMetas.get(i).getName();
        }
        for (int i = 0; i < obj.length - 1; ++i) {
            Object[] data = rows.get(i).getData();
            for (int j = 0; j < valueMetas.size(); ++j) {
                obj[i + 1][j] = data[j];
            }
        }
        return obj;
    }
}
