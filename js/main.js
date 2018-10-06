$(function () {

    function buildTree(val){
        let trees=[];
        val.forEach(function(subText, index){
            let right, left;
            if (index===0){
                right=val.length-1
            } else {
                right=index-1
            }
            if(index>=val.length-1){
                left = 0
            }else{
                left=index+1
            }
            let str= "";
            subText.keys.forEach(function(char){

                let indexes=getAllIndexes(subText.text, char);
                let l = [];
                let r = [];
                indexes.forEach(function(idx){
                    r.push(val[right].text[idx-1]);
                    l.push(val[left].text[idx])
                });
                str+=r.reverse().join("")+"-<span class='font-weight-bold'>"+char+"</span>-"+l.join("")+"<br/>\n"
            });
            trees.push(str);
        });
        return trees;
    }

    function cleanEncryptText() {
        return $("#params").serializeFormJSON().encryptText.replace(/[\s.,_]/gui, '')
    }

    function countLetters(str) {
        var cleanStr = str;
        var counts = new Map();
        var ch, index, len, count;
        for (index = 0, len = cleanStr.length; index < len; ++index) {
            ch = cleanStr.charAt(index); // Not all engines support [] on strings
            count = counts.get(ch);
            counts.set(ch, count ? count + 1 : 1);
        }
        return new Map([...counts.entries()].sort((a, b) => b[1] - a[1]));
    }

    function splitIn(size) {
        let msg = cleanEncryptText();
        return msg.match(new RegExp('.{1,' + size + '}', 'g'))
    }

    function divText() {
        let txt = cleanEncryptText();
        let tmpPost = 0;
        let size = $("#keysize").val();
        let final = [];
        for (i = 0; i < txt.length; i++) {

            if (final[tmpPost] === undefined) {
                final[tmpPost] = [];
            }

            final[tmpPost].push(txt.charAt(i));

            if (tmpPost >= size - 1) {
                tmpPost = 0
            } else {
                tmpPost++;
            }
        }
        return final;
    }


    function processTemplate(id, object, target) {
        var source = $(id).html();
        var template = Handlebars.compile(source);
        var rendered = template(object);
        $(target).html(rendered);
    }

    function kasiskiBabbage() {
        let split = splitString(cleanEncryptText(), $("#kasiskibabbage").val());
        return split.getDuplicates();
    }

    $('#Preliminar').click(function () {
        processTemplate("#countLetters",
            {
                letters: countLetters(cleanEncryptText()),
                total: cleanEncryptText().length
            }, "#home");
        processTemplate("#tkasiskibabbage", {pattern: kasiskiBabbage()}, "#profile")
        $("#keysize").val($("#mcd").data('value'));
    });

    $("#Friedman").click(function () {
        let subtext = divText();
        let counts = [];
        subtext.forEach(function (subtext) {
            counts.push(countLetters(subtext.join('')));
        });
        let arr = [];
        counts.forEach(function (tree, index) {
            for (const [key, value] of tree) {
                if (arr[index]===undefined){
                    arr[index]={keys:[],text:""}
                }
                arr[index].keys.push(key)
            }
            arr[index].text=subtext[index];
        });

        processTemplate("#tFriedman", {
            splits: counts
        }, "#contact");


        processTemplate("#ttree", {
            trees: buildTree(arr)
        }, "#tree");

        processTemplate("#ttxt", {
            txts: arr
        }, "#txt");
    });



});
