// Stackoverflow code.
(function ($) {
    Handlebars.registerHelper('eachInMap', (map, block) => {
        let output = '';
        for (const [ key, value ] of map) {
            output += block.fn({ key, value });
        }
        return output;
    });

    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    Handlebars.registerHelper("percent", function(count, total) {
        let per = (count/total)*100;
        return math.round(per,4)
    });

    Handlebars.registerHelper("percent2", function(count, array) {
        let total = [...array.values()].reduce((a,b)=>a+b);
        let per = (count/total)*100;
        return math.round(per,4)
    });

    Handlebars.registerHelper("sum", function(a, b) {
        return math.sum(a,b)
    });

    Handlebars.registerHelper("ic", function(array) {
        let alfLength=27;
        let letters = [...array.values()];
        let total=math.sum(letters);
        let sum=math.sum(letters.map(function (c) {
            return c*(c-1);
        }));
        return math.round((sum / (total*(total-1))), 5);
    });

    Handlebars.registerHelper("tsum", function(sum) {

        return math.sum([...sum.values()])
    });

    Handlebars.registerHelper("join", function(array) {

        return array.join("")
    });


    Handlebars.registerHelper("distance", function(a) {
            return math.abs(a[0] - a[1])    ;
    });

    Handlebars.registerHelper("mcd", function(pattern) {
        let mcd = [];

        Object.values(pattern).forEach(function (item) {
            mcd.push([math.abs(item[0] - item[1])])
        });
        if(mcd.length>1) {
            return math.gcd(...mcd);
        }else {
            return mcd[0];
        }
    });

    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);
function  splitString(str, size) {
    var ch, index, len;
    let splits = new Array()
    for (index = 0, len = str.length; index < len; ++index) {
        splits.push(str.substr(index,size));
    }
    return splits;
};

Array.prototype.getDuplicates = function () {
    var duplicates = {};
    for (var i = 0; i < this.length; i++) {
        if(duplicates.hasOwnProperty(this[i])) {
            duplicates[this[i]].push(i);
        } else if (this.lastIndexOf(this[i]) !== i) {
            duplicates[this[i]] = [i];
        }
    }
    return duplicates;
};
function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

