
export function tagsCheck(input) {
    var tags, tagsErr, result1, result2, count1, count2
    tags = [["<img", "alt=", 0, 0],["<td", '" valign="', 0, 0],["<img", 'border="0" style="', 0, 0],["href=", 'target="_blank"', 0, 0],["<a", "</a>", 0, 0],["<abbr", "</abbr>", 0, 0],["<acronym", "</acronym>", 0, 0],["<address", "</address>", 0, 0],["<applet", "</applet>", 0, 0],["<area", "</area>", 0, 0],["<article", "</article>", 0, 0],["<aside", "</aside>", 0, 0],["<audio", "</audio>", 0, 0],["<base", "</base>", 0, 0],["<basefont", "</basefont>", 0, 0],["<bdo", "</bdo>", 0, 0],["<big", "</big>", 0, 0],["<blockquote", "</blockquote>", 0, 0],["<body", "</body>", 0, 0],["<button", "</button>", 0, 0],["<canvas", "</canvas>", 0, 0],["<caption", "</caption>", 0, 0],["<center", "</center>", 0, 0],["<cite", "</cite>", 0, 0],["<code", "</code>", 0, 0],["<col", "</col>", 0, 0],["<colgroup", "</colgroup>", 0, 0],["<datalist", "</datalist>", 0, 0],["<dd", "</dd>", 0, 0],["<del", "</del>", 0, 0],["<dfn", "</dfn>", 0, 0],["<div", "</div>", 0, 0],["<dl", "</dl>", 0, 0],["<dt", "</dt>", 0, 0],["<embed", "</embed>", 0, 0],["<fieldset", "</fieldset>", 0, 0],["<figcaption", "</figcaption>", 0, 0],["<figure", "</figure>", 0, 0],["<font", "</font>", 0, 0],["<footer", "</footer>", 0, 0],["<form", "</form>", 0, 0],["<frame", "</frame>", 0, 0],["<frameset", "</frameset>", 0, 0],["<head", "</head>", 0, 0],["<header", "</header>", 0, 0],["<h1", "</h1>", 0, 0],["<html", "</html>", 0, 0],["<i ", "</i>", 0, 0],["<iframe", "</iframe>", 0, 0],["<input", "</input>", 0, 0],["<ins", "</ins>", 0, 0],["<kbd", "</kbd>", 0, 0],["<label", "</label>", 0, 0],["<legend", "</legend>", 0, 0],["<main", "</main>", 0, 0],["<map", "</map>", 0, 0],["<mark", "</mark>", 0, 0],["<meter", "</meter>", 0, 0],["<nav", "</nav>", 0, 0],["<noscript", "</noscript>", 0, 0],["<object", "</object>", 0, 0],["<ol", "</ol>", 0, 0],["<optgroup", "</optgroup>", 0, 0],["<option", "</option>", 0, 0],["<p", "</p>", 0, 0],["<param", "</param>", 0, 0],["<pre", "</pre>", 0, 0],["<progress", "</progress>", 0, 0],["<samp", "</samp>", 0, 0],["<script", "</script>", 0, 0],["<section", "</section>", 0, 0],["<select", "</select>", 0, 0],["<small", "</small>", 0, 0],["<source", "</source>", 0, 0],["<span", "</span>", 0, 0],["<strike", "</strike>", 0, 0],["<strong", "</strong>", 0, 0],["<style", "</style>", 0, 0],["<sub", "</sub>", 0, 0],["<sup", "</sup>", 0, 0],["<table", "</table>", 0, 0],["<tbody", "</tbody>", 0, 0],["<td", "</td>", 0, 0],["<textarea", "</textarea>", 0, 0],["<tfoot", "</tfoot>", 0, 0],["<th", "</th>", 0, 0],["<thead", "</thead>", 0, 0],["<time", "</time>", 0, 0],["<title", "</title>", 0, 0],["<tr", "</tr>", 0, 0],["<ul", "</ul>", 0, 0],["<var", "</var>", 0, 0],["<video", "</video>", 0, 0],["<wbr", "</wbr>", 0, 0]];
    tagsErr = new Array
    for (var i = 0; i < tags.length; i++) {
        var regfilter1 = new RegExp(tags[i][0], "gmiu")
        var regfilter2 = new RegExp(tags[i][1], "gmiu")
        result1 = regfilter1.exec(input)
        result2 = regfilter2.exec(input)
        count1 = 0
        count2 = 0
        while (result1) {
            count1++
            tags[i][2] = count1
            result1 = regfilter1.exec(input)
        }
        while (result2) {
            count2++
            tags[i][3] = count2
            result2 = regfilter2.exec(input)
        }
    }
    for (var j = 0; j < tags.length; j++) {
        if(tags[j][2]!==tags[j][3]){
            tagsErr.push(tags[j])
        }
    }
    return tagsErr
}

export function htmlEscape(input) {
    var htmlEscapeArray = [
        ["<", "&lt;"],
        [">", "&gt;"],
        ['"', "&quot;"]
    ]
    for (var k = 0; k < htmlEscapeArray.length; k++) {
        var regexp = new RegExp(htmlEscapeArray[k][0], "gm")
        input = input.replace(regexp, htmlEscapeArray[k][1])
    }
    return input
}

/* ENTITIZER - 2.0 --------------
NOW SUPPORT DECODE FUNCTION */

export function entitizer(method, input) {
    if (method == 'encode' || method == 'decode' && input !== null) {
        var entitizedCharCount = 0
        var arrayv = [[8364, "&euro;", "&#8364;"],[9674, "&loz;", "&#9674;"],[9824, "&spades;", "&#9824;"],[9827, "&clubs;", "&#9827;"],[9829, "&hearts;", "&#9829;"],[9830, "&diams;", "&#9830;"],[96, "&#x60;"],[161, "&#161;", "&iexcl;"],[162, "&#162;", "&cent;"],[163, "&#163;", "&pound;"],[164, "&#164;", "&curren;"],[165, "&#165;", "&yen;"],[166, "&#166;", "&brvbar;"],[167, "&#167;", "&sect;"],[168, "&#168;", "&uml;"],[169, "&#169;", "&copy;"],[170, "&#170;", "&ordf;"],[171, "&#171;", "&laquo;"],[172, "&#172;", "&not;"],[173, "&#173;", "&shy;"],[174, "&#174;", "&reg;"],[175, "&#175;", "&macr;"],[176, "&#176;", "&deg;"],[177, "&#177;", "&plusmn;"],[178, "&#178;", "&sup2;"],[179, "&#179;", "&sup3;"],[180, "&#180;", "&acute;"],[181, "&#181;", "&micro;"],[182, "&#182;", "&para;"],[183, "&#xB7;"],[184, "&#xB8;", "&cedil;"],[185, "&#xB9;", "&sup1;"],[186, "&#xBA;", "&ordm;"],[187, "&#xBB;", "&raquo;"],[188, "&#xBC;", "&frac14;"],[189, "&#xBD;", "&frac12;"],[190, "&#xBE;", "&frac34;"],[191, "&#xBF;", "&iquest;"],[192, "&#xC0;", "&Agrave;"],[193, "&#xC1;", "&Aacute;"],[194, "&#xC2;", "&Acirc;"],[195, "&#xC3;", "&Atilde;"],[196, "&#xC4;", "&Auml;"],[197, "&#xC5;", "&Aring;"],[198, "&#xC6;", "&AElig;"],[199, "&#xC7;", "&Ccedil;"],[200, "&#xC8;", "&Egrave;"],[201, "&#xC9;", "&Eacute;"],[202, "&#xCA;", "&Ecirc;"],[203, "&#xCB;", "&Euml;"],[204, "&#xCC;", "&Igrave;"],[205, "&#xCD;", "&Iacute;"],[206, "&#xCE;", "&Icirc;"],[207, "&#xCF;", "&Iuml;"],[208, "&#xD0;", "&ETH;"],[209, "&#xD1;", "&Ntilde;"],[210, "&#xD2;", "&Ograve;"],[211, "&#xD3;", "&Oacute;"],[212, "&#xD4;", "&Ocirc;"],[213, "&#xD5;", "&Otilde;"],[214, "&#xD6;", "&Ouml;"],[215, "&#xD7;"],[216, "&#xD8;", "&Oslash;"],[217, "&#xD9;", "&Ugrave;"],[218, "&#xDA;", "&Uacute;"],[219, "&#xDB;", "&Ucirc;"],[220, "&#xDC;", "&Uuml;"],[221, "&#xDD;", "&Yacute;"],[222, "&#xDE;", "&THORN;"],[223, "&#xDF;", "&szlig;"],[224, "&#xE0;", "&agrave;"],[225, "&#xE1;", "&aacute;"],[226, "&#xE2;", "&acirc;"],[227, "&#xE3;", "&atilde;"],[228, "&#xE4;", "&auml;"],[229, "&#xE5;", "&aring;"],[230, "&#xE6;", "&aelig;"],[231, "&#xE7;", "&ccedil;"],[232, "&#xE8;", "&egrave;"],[233, "&#xE9;", "&eacute;"],[234, "&#xEA;", "&ecirc;"],[235, "&#xEB;", "&euml;"],[236, "&#xEC;", "&igrave;"],[237, "&#xED;", "&iacute;"],[238, "&#xEE;", "&icirc;"],[239, "&#xEF;", "&iuml;"],[240, "&#xF0;", "&eth;"],[241, "&#xF1;", "&ntilde;"],[242, "&#xF2;", "&ograve;"],[243, "&#xF3;", "&oacute;"],[244, "&#xF4;", "&ocirc;"],[245, "&#xF5;", "&otilde;"],[246, "&#xF6;", "&ouml;"],[247, "&#xF7;", "&divide;"],[248, "&#xF8;", "&oslash;"],[249, "&#xF9;", "&ugrave;"],[250, "&#xFA;", "&uacute;"],[251, "&#xFB;", "&ucirc;"],[252, "&#xFC;", "&uuml;"],[253, "&#xFD;", "&yacute;"],[254, "&#xFE;", "&thorn;"],[255, "&#xFF;", "&yuml;"],[256, "&#x100;"],[257, "&#x101;"],[258, "&#x102;"],[259, "&#x103;"],[260, "&#x104;"],[261, "&#x105;"],[262, "&#x106;"],[263, "&#x107;"],[264, "&#x108;"],[265, "&#x109;"],[266, "&#x10A;"],[267, "&#x10B;"],[268, "&#x10C;"],[269, "&#x10D;"],[270, "&#x10E;"],[271, "&#x10F;"],[272, "&#x110;"],[273, "&#x111;"],[274, "&#x112;"],[275, "&#x113;"],[276, "&#x114;"],[277, "&#x115;"],[278, "&#x116;"],[279, "&#x117;"],[280, "&#x118;"],[281, "&#x119;"],[282, "&#x11A;"],[283, "&#x11B;"],[284, "&#x11C;"],[285, "&#x11D;"],[286, "&#x11E;"],[287, "&#x11F;"],[288, "&#x120;"],[289, "&#x121;"],[290, "&#x122;"],[291, "&#x123;"],[292, "&#x124;"],[293, "&#x125;"],[294, "&#x126;"],[295, "&#x127;"],[296, "&#x128;"],[297, "&#x129;"],[298, "&#x12A;"],[299, "&#x12B;"],[300, "&#x12C;"],[301, "&#x12D;"],[302, "&#x12E;"],[303, "&#x12F;"],[304, "&#x130;"],[305, "&#x131;"],[306, "&#x132;"],[307, "&#x133;"],[308, "&#x134;"],[309, "&#x135;"],[310, "&#x136;"],[311, "&#x137;"],[312, "&#x138;"],[313, "&#x139;"],[314, "&#x13A;"],[315, "&#x13B;"],[316, "&#x13C;"],[317, "&#x13D;"],[318, "&#x13E;"],[319, "&#x13F;"],[320, "&#x140;"],[321, "&#x141;"],[322, "&#x142;"],[323, "&#x143;"],[324, "&#x144;"],[325, "&#x145;"],[326, "&#x146;"],[327, "&#x147;"],[328, "&#x148;"],[329, "&#x149;"],[330, "&#x14A;"],[331, "&#x14B;"],[332, "&#x14C;"],[333, "&#x14D;"],[334, "&#x14E;"],[335, "&#x14F;"],[336, "&#x150;"],[337, "&#x151;"],[338, "&#x152;"],[339, "&#x153;"],[340, "&#x154;"],[341, "&#x155;"],[342, "&#x156;"],[343, "&#x157;"],[344, "&#x158;"],[345, "&#x159;"],[346, "&#x15A;"],[347, "&#x15B;"],[348, "&#x15C;"],[349, "&#x15D;"],[350, "&#x15E;"],[351, "&#x15F;"],[352, "&#x160;"],[353, "&#x161;"],[354, "&#x162;"],[355, "&#x163;"],[356, "&#x164;"],[357, "&#x165;"],[358, "&#x166;"],[359, "&#x167;"],[360, "&#x168;"],[361, "&#x169;"],[362, "&#x16A;"],[363, "&#x16B;"],[364, "&#x16C;"],[365, "&#x16D;"],[366, "&#x16E;"],[367, "&#x16F;"],[368, "&#x170;"],[369, "&#x171;"],[370, "&#x172;"],[371, "&#x173;"],[372, "&#x174;"],[373, "&#x175;"],[374, "&#x176;"],[375, "&#x177;"],[376, "&#x178;"],[377, "&#x179;"],[378, "&#x17A;"],[379, "&#x17B;"],[380, "&#x17C;"],[381, "&#x17D;"],[382, "&#x17E;"]]
        var tempArray1 = [""]
        if (method == 'encode') {
            for (var v = 0; v < arrayv.length; v++) {
                if (arrayv[v].length === 2) {
                    var repstr = String.fromCharCode(arrayv[v][0])
                    var regexp = new RegExp(repstr, "gm")
                    tempArray1[0] = input.replace(regexp, arrayv[v][1])
                    if (input !== tempArray1[0]) {
                        entitizedCharCount++
                        input = tempArray1[0]
                    }
                    continue;
                }
                if (arrayv[v].length === 3) {
                    var repstr = String.fromCharCode(arrayv[v][0])
                    var regexp = new RegExp(repstr, "gm")
                    tempArray1[0] = input.replace(regexp, arrayv[v][2])
                    if (input !== tempArray1[0]) {
                        entitizedCharCount++
                        input = tempArray1[0]
                    }
                }
            }
        }
        if (method == 'decode') {
            //FOR DECODING SPACE
            arrayv.push([32, "&nbsp;", "&#32;"])
            for (var v = 0; v < arrayv.length; v++) {
                var repstr = arrayv[v][1]
                var regexp = new RegExp(repstr, "gm")
                tempArray1[0] = input.replace(regexp, String.fromCharCode(arrayv[v][0]))
                if (input !== tempArray1[0]) {
                    entitizedCharCount++
                    input = tempArray1[0]
                }
                if (arrayv[v].length === 3) {
                    var repstr = arrayv[v][2]
                    var regexp = new RegExp(repstr, "gm")
                    tempArray1[0] = input.replace(regexp, String.fromCharCode(arrayv[v][0]))
                    if (input !== tempArray1[0]) {
                        entitizedCharCount++
                        input = tempArray1[0]
                    }
                }
            }
        }
        console.log(entitizedCharCount + " characters has been " + method + "d")
        return input
    }
    console.log('An error occured. "' + method + '" is not a valid method.')
}


export function copyToClipboard(str) {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}

export function cleanNews(html) {
    var parser = new DOMParser()
    var doc = parser.parseFromString(html, "text/html")
    var tables = doc.querySelectorAll('table')
    tables.forEach(table => {
        $(table).removeAttr('style')
    })
    var tds = doc.querySelectorAll('td')
    tds.forEach(td => {
        $(td).attr('align', 'center')
        $(td).attr('valign', 'bottom')
        $(td).removeAttr('colspan')
        $(td).removeAttr('rowspan')

        if (td.querySelectorAll('table').length == 0) {
            var hrefs = td.querySelectorAll('a')
            hrefs.forEach(href => {
                var imgh = href.querySelector('img')
                if ($(imgh).attr('height') <= 19 && $(imgh).attr('height') > 0 && $(imgh).attr('height') !== '' && $(imgh).attr('height') !== undefined) {
                    console.log('td', td)
                    $(td).css("line-height", $(imgh).attr('height') + "px")
                }
            })
        }
    })
    var imgs = doc.querySelectorAll('img')
    imgs.forEach(element => {
        $(element).attr('border', '0')
        $(element).css('vertical-align', 'bottom')
    })
    var hrefs = doc.querySelectorAll('a')
    hrefs.forEach(a => {
        var titles = a.querySelector('img')
        var title = $(titles).attr('alt')
        $(a).attr('title', title)
        $(a).attr('target', '_blank')
        var link = $(a).attr('href')
        $(a).attr('href', link)
    })
    $(doc.querySelector("table")).removeAttr('style')
    var html = doc.querySelector("table").outerHTML
    console.log(html)
    html = html.replace(/<tbody>|<\/tbody>/gmui, "")
    return this.entitizer('encode', this.escapeHtml(html))
}

export function escapeHtml(e) {
    var entityMap = { '&amp;': '&','&lt;': '<','&gt;': '>','&quot;': '"',"&#39;": '\'','&#x2F;': '/','&#x60;': '`','&#x3D;': '='}
    return String(e).replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;|&#x60;|&#x3D;/g, function(s) {
        return entityMap[s];
    })
}