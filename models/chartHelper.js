var data = [
    //- {name: 'tag1', series: [VALUES...], labels: [DATES...]},
];

module.exports.fillTags = function (chartData) {
    // console.log("chartData", chartData);
    data = [];
    var tags = getUniqTags(chartData);
    tags.forEach( tag => {
        chartData.forEach(row => {
            Object.keys(row).forEach(att => { 
                if(att == tag){
                    if(!resIncludesTagBefore(tag)){
                        var n = {name: tag, series: [[]], labels: []}
                        n.series[0].unshift(row[att])
                        n.labels.unshift(_date(row['lastUpdated']))
                        data.push(n);
                    }else{
                        data.forEach(y => {
                            if(y.name == tag){
                                y.series[0].unshift(row[att]); 
                                y.labels.unshift(_date(row['lastUpdated']));
                            }
                        });
                    }
                }
            });
        });
    }); 
    return data;
}

function resIncludesTagBefore(tag){
    var x = false;
    data.forEach( el => {
        if(el.name == tag)
            x = true;
    });
    return x;
}

function getUniqTags(chartData){
    var tags = [];
    chartData.forEach((obj)=>{ 
        Object.keys(obj).forEach(function(key) {
            var exc = ['_id', 'deviceId', 'lastUpdated', 'version'];
            if(exc.includes(key))
                return;
            tags.push(key)                   
        });
    });
    return Array.from(new Set(tags));
}

function _date(d){
    return new Date(d).getDate()
}