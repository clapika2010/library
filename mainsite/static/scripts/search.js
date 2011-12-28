function preCheckSearch(frm) {
	searchValue = frm.searchTxt.value;
	if (searchValue == null || searchValue == ""){
		alert("You didn't type anything in Search Box!");
	}
	else {
		start = 0;
		end = searchValue.length - 1;
		while (searchValue.charAt(start) == " ") {
			start += 1;
		}
		while (searchValue.charAt(end) == " ") {
			end -= 1;
		}
		searchValue = searchValue.slice(start,end+1);
		frm.searchTxt.value = searchValue;
	}
}