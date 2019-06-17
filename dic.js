(function (window, document) {
    window.onload = function () {
        'use strict';
        var dictionary = document.getElementById('dictionary');

        // document.getElementById('letter-a')
        // .getElementsByTagName('a')[0].onclick = function(e){
        //     e.preventDefault();
        //     ajaxGET('a.html', function(res){
        //         dictionary.innerHTML = res;
        //     });
        // };

        // document.getElementById('letter-b')
        // .getElementsByTagName('a')[0].onclick = function(e){
        //     e.preventDefault();
        //     ajaxGET('b.json', function(res){
        //         dictionary.innerHTML = '<div class="entry">';
        //     });
        // };

        // document.forms[0].onsubmit = function(e){
        //     e.preventDefault();
        //     var url = 'f.php?term=' + this.term.value.trim();
        //     var xhr = new XMLHttpRequest();
        //     xhr.open('GET',url,true);
        //     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        //     xhr.onreadystatechange = function(){
        //         if(xhr.readyState === 4 && xhr.status === 200) {
        //             dictionary.innerHTML = xhr.responseText;
        //         }
        //     }
        //     xhr.send();
        // };

        function createEntry(data) {
            var html = '';
            var entry;
            for (var i = 0, len = data.length; i < len; i++) {
                entry = data[i];
                html += '<div class="entry">';
                html += '<h3 class="term">' + entry.term + '</h3>';
                html += '<div class="part">' + entry.part + '</div>';
                html += '<div class="definition">';
                html += entry.definition;
                if (entry.quote /*  !== undefined */) {
                    html += '<div class="quote">';
                    html += '<div class="quote-line">' + entry.quote.join('</div><div class="quote-line">')
                    html += '</div>'; // end .quote-line
                    if (entry.author /* !== undefined */) {
                        html += '<div class="quote-author">' + entry.author + '</div>';
                    }
                    html += '</div>'; // end .quote
                }
                html += '</div>'; // end .definition
                html += '</div>'; // end .entry
            }
            return html;
        }

        function createEntryXML(doc) {
            var entries = doc.getElementsByTagName('entry');            
            var html = '';
            var entry;
            var quote;
            var lines;
            for(var i = 0, len = entries.length; i < len; i++) {
                entry = entries[i];             
                html += '<div class="entry">';
                html += '<h3 class="term">' + entry.getAttribute('term') + '</h3>';
                html += '<div class="part">' + entry.getAttribute('part') + '</div>';
                html += '<div class="definition">';
                html += entry.getElementsByTagName('definition')[0].textContent;
                quote = entry.getElementsByTagName('quote');
                if( quote.length ) {
                    lines = entry.getElementsByTagName('line');
                    html += '<div class="quote">';
                    for(var j = 0, len2 = lines.length; j < len2; j++) {
                        html += '<div class="quote-line">' + lines[j].textContent + '</div>';
                    }
                    if(quote[0].getAttribute('author')) {
                        html += '<div class="quote-author">' + quote[0].getAttribute('author') + '</div>';
                    }
                    html += '</div>'; // end .quote
                }
                html += '</div>'; // end .definition
                html += '</div>'; // end .entry
            }
            return html;
        }

        document.getElementById('container').onclick = function (e) {
            e.preventDefault();
            /* A-Elemente */
            if (e.target.nodeName === 'A') {
                /* Erster Buchstabe im A-Element wird ermittelt */
                switch (e.target.textContent.slice(0, 1)) {
                    case 'A':
                        ajaxGET('a.html', function (res) {
                            dictionary.innerHTML = res;
                        });
                        break;
                    case 'B':
                        ajaxGET('b.json', function (res) {
                            dictionary.innerHTML = createEntry(JSON.parse(res));
                        });
                        break;
                    case 'D':
                        ajaxGETXML('d.xml', function(xml){
                            dictionary.innerHTML = createEntryXML(xml);
                        });
                        break;
                    case 'E':
                        ajaxGET(e.target.href, function (res) {
                            dictionary.innerHTML = res;
                        });
                        break;
                    case 'S':
                        /* Content des Buttons Search also S. Wird in diesem Beispiel aber mit eigener else if Abfrage gelöst */
                        break;
                } /* Formular */
            } else if (e.target.nodeName === 'BUTTON') {
                /* Querystring zieldatei: f.php, Schlüssel: term, Wert: value aus input#term */
                var url = 'f.php?term=' + e.target.parentElement.term.value.trim();
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        dictionary.innerHTML = xhr.responseText;
                    }
                }
                xhr.send();
            }
        };
    };
}(window, document));




/* Template String (``) mit ECMA 6 */
var term = 'BACHUSS';
var template = `<h3>${term}</h3>`;
console.log(template);

/* Eigene Template Strings mit replace */
var term = 'BACHUSS';
var template = '<h3>${term}</h3>';
template = template.replace('${term}', term);
console.log(template);


