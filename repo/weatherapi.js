/**
 * Created by xang on 4/29/2016.
 */
var request=require('request');

function weatherapi(){

    this.getcurenweather= function (url, callback) {
        var weatherData={};

        getweatherapi(url, function (body) {

            weatherData.name=body.name;
            weatherData.pressure=body.main.pressure;
            weatherData.humidity=body.main.humidity;
            weatherData.temp=body.main.temp;
            weatherData.temp_min=body.main.temp_min;
            weatherData.temp_max=body.main.temp_max;
            weatherData.visibility=body.visibility/1000;
            weatherData.speed=body.wind.speed;
            weatherData.clouds=body.clouds.all;
            var time=getcurentime();
            weatherData.time=time;
            weatherData.country='Laos';
            weatherData.weather=body.weather[0];

            callback(weatherData);

        });
    };

}

weatherapi.prototype.getforcastweather= function (url, callback) {

var forecast=[];
var isin=false;
getweatherapi(url, function (body) {

    for (var i=0;i<body.list.length;i++){

        if (forecast.length<=0){

            forecast.push({
                dt:body.list[0].dt,
                dayname:getdayname(body.list[0].dt),
                icon:body.list[0].weather[0].icon,
                desc:body.list[0].weather[0].description,
                temp:body.list[0].main.temp,
                wind:body.list[0].wind.speed,
                clouds:body.list[0].clouds.all,
                temp_min:body.list[0].main.temp_min,
                temp_max:body.list[0].main.temp_max,
                pressure:body.list[0].main.pressure,
                humidity:body.list[0].main.humidity,
                dt_txt:body.list[0].dt_txt
            });

        }else{

            for (var j=0;j<forecast.length;j++){

                var a=new Date(forecast[j].dt_txt);
                var timeA= a.getDay()+ a.getDate()+ a.getMonth()+ a.getFullYear();
                var b=new Date(body.list[i].dt_txt);
                var timeB= b.getDay()+ b.getDate()+ b.getMonth()+ b.getFullYear();

                if (timeA===timeB){
                    isin=true;
                    break;
                }

            }

            if (!isin){

                forecast.push({
                    dt:body.list[i].dt,
                    dayname:getdayname(body.list[i].dt),
                    icon:body.list[i].weather[0].icon,
                    desc:body.list[i].weather[0].description,
                    temp:body.list[i].main.temp,
                    wind:body.list[i].wind.speed,
                    clouds:body.list[0].clouds.all,
                    temp_min:body.list[i].main.temp_min,
                    temp_max:body.list[i].main.temp_max,
                    pressure:body.list[i].main.pressure,
                    humidity:body.list[i].main.humidity,
                    dt_txt:body.list[i].dt_txt
                });
            }


        }

        isin=false;

    }

    callback(forecast);

});

};

weatherapi.prototype.getcurenforecast= function (url, callback) {

    var curenforecast=[];

    getweatherapi(url, function (body) {

    var datecurent=new Date();
        var date=datecurent.getDate();

        for (var i=0;i<body.list.length;i++){

            var dt=new Date(body.list[i].dt_txt);
            var cdate=dt.getDate();

            if (date===cdate){

                curenforecast.push({

                    time:getAMandPM(dt.getHours()),
                    icon:body.list[i].weather[0].icon,
                    temp:body.list[i].main.temp

                });

            }

        }

callback(curenforecast);

    });


};



function getdayname(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var daynames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayname=daynames[a.getDay()];
    return dayname;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var mid=getAMandPM(hour);
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min+' '+mid ;
    return time;
}//convert time

function getAMandPM(hour){
var stdtime=null;
    if (hour>12){
        stdtime=hour-12+' PM';
    }else{
        stdtime=hour+' AM'
    }

    return stdtime;
}

function getcurentime(){
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var dt=new Date();
    var date=dt.getDate();
    var month=months[dt.getMonth()];
    var year=dt.getFullYear();
    var hour=dt.getHours();
    var min=dt.getMinutes();

var datetimefull=date+' '+month+' '+year+' '+hour+':'+min;
    return datetimefull;

}

function getweatherapi(url,callback){

    request({url:url,json:true}, function (err, res, body) {

        if (!err && res.statusCode==200){

            callback(body);

        }else {

        }

    });

}//get api weather

module.exports=weatherapi;

//console.log(gethour(1461942000));
