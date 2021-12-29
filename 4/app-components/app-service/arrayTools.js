export default {
	getColumn(list,column_key){
		let tmp = [];
		for (var i = 0; i < list.length; i++) {
			tmp.push(list[i][column_key]);
		}
		return tmp;
	}
}