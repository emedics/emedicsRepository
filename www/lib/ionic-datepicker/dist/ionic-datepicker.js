"use strict";var app=angular.module("ionic-datepicker",["ionic","ionic-datepicker.templates"]);app.service("DatepickerService",function(){this.monthsList=["January","February","March","April","May","June","July","August","September","October","November","December"],this.yearsList=[1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2e3,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059,2060,2061,2062,2063,2064,2065,2066,2067,2068,2069,2070,2071,2072,2073,2074,2075,2076,2077,2078,2079,2080,2081,2082,2083,2084,2085,2086,2087,2088,2089,2090,2091,2092,2093,2094,2095,2096,2097,2098,2099,2100]}),app.directive("ionicDatepicker",["$ionicPopup","DatepickerService",function(e,t){return{restrict:"AE",replace:!0,scope:{ipDate:"=idate",disablePreviousDates:"=disablepreviousdates",disableFutureDates:"=disablefuturedates",callback:"=callback",title:"=title",disabledDates:"=?disableddates"},link:function(a,n){a.datePickerTitle=a.title||"Select Date";var i=t.monthsList;if(a.monthsList=i,a.yearsList=t.yearsList,a.currentMonth="",a.currentYear="",a.ipDate||(a.ipDate=new Date),angular.isDefined(a.disabledDates))for(var r=0;r<a.disabledDates.length;r++)a.disabledDates[r]=a.disabledDates[r].getTime();else a.disabledDates=[];a.previousDayEpoch=+new Date-864e5,a.nextDayEpoch=+new Date;var s=angular.copy(a.ipDate);s.setHours(0),s.setMinutes(0),s.setSeconds(0),s.setMilliseconds(0),a.selctedDateString=s.toString(),a.weekNames=["S","M","T","W","T","F","S"],a.today={};var o=new Date,l=new Date(o.getFullYear(),o.getMonth(),o.getDate());a.today={dateObj:o,date:l.getDate(),month:l.getMonth(),year:l.getFullYear(),day:l.getDay(),dateString:l.toString(),epochLocal:l.getTime(),epochUTC:l.getTime()+60*l.getTimezoneOffset()*1e3};var c=function(e){e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),a.selctedDateString=new Date(e).toString(),s=angular.copy(e);var t=new Date(e.getFullYear(),e.getMonth(),1).getDate(),n=new Date(e.getFullYear(),e.getMonth()+1,0).getDate();a.dayList=[];for(var r=t;n>=r;r++){var o=new Date(e.getFullYear(),e.getMonth(),r);a.dayList.push({date:o.getDate(),month:o.getMonth(),year:o.getFullYear(),day:o.getDay(),dateString:o.toString(),epochLocal:o.getTime(),epochUTC:o.getTime()+60*o.getTimezoneOffset()*1e3})}var t=a.dayList[0].day;a.currentMonthFirstDayEpoch=a.dayList[0].epochLocal,a.currentMonthLastDayEpoch=a.dayList[a.dayList.length-1].epochLocal;for(var l=0;t>l;l++)a.dayList.unshift({});a.rows=[],a.cols=[],a.currentMonth=i[e.getMonth()],a.currentYear=e.getFullYear(),a.currentMonthSelected=a.currentMonth,a.currentYearSelected=a.currentYear,a.numColumns=7,a.rows.length=6,a.cols.length=a.numColumns};a.monthChanged=function(e){var t=a.monthsList.indexOf(e);s.setMonth(t),c(s)},a.yearChanged=function(e){s.setFullYear(e),c(s)},a.prevMonth=function(){1===s.getMonth()&&s.setFullYear(s.getFullYear()),s.setMonth(s.getMonth()-1),a.currentMonth=i[s.getMonth()],a.currentYear=s.getFullYear(),c(s)},a.nextMonth=function(){11===s.getMonth()&&s.setFullYear(s.getFullYear()),s.setMonth(s.getMonth()+1),a.currentMonth=i[s.getMonth()],a.currentYear=s.getFullYear(),c(s)},a.date_selection={selected:!1,selectedDate:"",submitted:!1},a.dateSelected=function(e){a.selctedDateString=e.dateString,a.date_selection.selected=!0,a.date_selection.selectedDate=new Date(e.dateString)},n.on("click",function(){if(a.ipDate)c(angular.copy(a.ipDate));else{var t=new Date;c(t)}e.show({templateUrl:"date-picker-modal.html",title:a.datePickerTitle,subTitle:"",scope:a,buttons:[{text:"Close",onTap:function(){a.callback(void 0)}},{text:"Today",onTap:function(e){var t=new Date;t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0);var n=new Date(t.getFullYear(),t.getMonth(),t.getDate()),i={date:t.getDate(),month:t.getMonth(),year:t.getFullYear(),day:t.getDay(),dateString:t.toString(),epochLocal:n.getTime(),epochUTC:n.getTime()+60*n.getTimezoneOffset()*1e3};a.selctedDateString=i.dateString,a.date_selection.selected=!0,a.date_selection.selectedDate=new Date(i.dateString),c(new Date),e.preventDefault()}},{text:"Set",type:"button-positive",onTap:function(e){a.date_selection.submitted=!0,a.date_selection.selected===!0?(a.ipDate=angular.copy(a.date_selection.selectedDate),a.callback(a.ipDate)):e.preventDefault()}}]})})}}}]);