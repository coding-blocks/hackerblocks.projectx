import { helper } from '@ember/component/helper';
import convertToTable from '../util/json-to-table'; // Ensure correct path

export default helper(function jsonToTable([data]) {
    return convertToTable(data);
});
