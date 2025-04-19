import { helper } from '@ember/component/helper';
import convertToTable from '../util/json-to-table'; 

export default helper(function jsonToTable([data]) {
    return convertToTable(data);
});