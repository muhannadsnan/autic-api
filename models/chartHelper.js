var res = [
    //- {name: 'tag1', series: [VALUES...], labels: [DATES...]},
];

module.exports.fillTags = function (chartData) {
    var tags = getUniqTags(chartData);
    tags.forEach( tag => {
        chartData.forEach(row => {
            Object.keys(row).forEach(att => { 
                if(att == tag){
                    if(!resIncludesTagBefore(tag)){
                        var n = {name: tag, series: [[]], labels: []}
                        n.series[0].push(row[att])
                        n.labels.push(_date(row['lastUpdated']))
                        res.push(n);
                    }else{
                        res.forEach(y => {
                            if(y.name == tag){
                                y.series[0].push(row[att]); 
                                y.labels.push(_date(row['lastUpdated']));
                            }
                        });
                    }
                }
            });
        });
    }); 
    return res;
}

function resIncludesTagBefore(tag){
    var x = false;
    res.forEach( el => {
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