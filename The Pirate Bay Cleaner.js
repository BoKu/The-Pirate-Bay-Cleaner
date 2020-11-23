// ==UserScript==
// @name        The Pirate Bay Cleaner
// @description Brand new and rewritten for 2020. Settings are now in the NAV menu.
// @namespace   https://greasyfork.org/scripts/1573-the-pirate-bay-cleaner
// @icon        https://i.imgur.com/ZYNsXKW.png
// @license 	The Pirate Bay Cleaner is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
// @author      BoKu
// @version     5.0
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.openInTab
// @noframes
// @match       http*://thepiratebay.org/*
// @match       http*://pirateproxy.surf/*
// @require     https://code.jquery.com/jquery-3.5.1.slim.min.js#sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj
// @require     https://cdnjs.cloudflare.com/ajax/libs/picomodal/3.0.0/picoModal.min.js#sha384-0NKR1Ea9NReNS6d43f6q+3MK/yIrsCa3lygmrOxKNrAWaKuElNgNoI6Biq1xiQ9i
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';

    const SiteDomain = document.domain;

    function RemoveAds(DoThis){
        GM.setValue("RemoveAds", DoThis);
        if(DoThis == true){
            $("section[class^='col-left ad']").remove();
            $("section[class^='col-right ad']").remove();
            $(".adblock").remove();
            $("dl#meta-right.col-meta").remove();
            $("div.links > label > a[href*='coiwqe.site']").remove();
            $("a[href*='a_fid=hulkvpn']").remove();
            /* Proxy Specific Settings */
            if(SiteDomain == "pirateproxy.surf"){
                $("center").remove();
            }
        }
        AddSetting("RemoveAds", "Remove advertisements (i.e. those pesky space-taking VPN ads!)", "checkbox", DoThis)
    }

    function FullSize(DoThis){
        GM.setValue("FullSize", DoThis);
        if(DoThis == true){
            $("body#browse").width("100%");
        }
        AddSetting("FullSize", "Resize the page to fill up the browser window. (i.e. Full size)", "checkbox", DoThis)
    }

    function RemovePorn(DoThis){
        GM.setValue("RemovePorn", DoThis);
        if(DoThis == true){
            $("optgroup[label='Porn']").remove();
            $("div[class='category_list'] > div, li[class*='list-entry'], span[class='form-box']").each(function(i){
                if($(this).text().toLowerCase().indexOf("porn") >= 0){
                    $(this).remove();
                }
            });
        }
        AddSetting("RemovePorn", "Remove adult material (i.e. Porn, XXX, etc.)", "checkbox", DoThis)
    }

    function DarkMode(DoThis, NoSetting){
        GM.setValue("DarkMode", DoThis);
        if(DoThis == true){
            $("body").css("background-color", "#121212");
            $("*").css("color", "#fff");
            $("a, a > strong").css({"color":"#02800e", "border-bottom":"1px dotted"});
            $("a > b").css({"color":"#02800e"});
            $("a").hover(function(){$(this).css("border-bottom","1px solid #02800e")}, function(){$(this).css("border-bottom","1px dotted #02800e")});
            $("a > img").parent().hover(function(){$(this).css({"border-bottom":"none"})}).css({"border-bottom":"none"});
            $("#browse h1, input, select#cat, h2, #description_container .text-box, #description_container #filelist li").css("background-color", "#242424");
            $("#browse h1").css("border-bottom", "solid 1px #555555");
            $("#description_container .text-box").css("border", "solid 1px #555555");
            $("#torrents span.list-header").css({"background":"#555555", "border": "solid 1px #121212"});
            $("#torrents li.list-entry, #description_container").css("background", "#333");
            $("#torrents li.list-entry").hover(function(){$(this).css("background", "#121212");},function(){$(this).css("background", "#333");});
            $("#torrents li.list-entry.alt").css("background", "#222");
            $("#torrents li.list-entry.alt").hover(function(){$(this).css("background", "#121212");},function(){$(this).css("background", "#222");});
            $("img[src*='tpb.jpg']").attr("style", "width:275px;height:295px;").attr("src", "https://i.imgur.com/F6VXCWv.png");
            $("img[src*='tpbsmall_notext.jpg']").attr("style", "width:82px;height:87px;").attr("src", "https://i.imgur.com/F6VXCWv.png");
        }
        if(!NoSetting){
            AddSetting("DarkMode", "Enable Dark Mode (A sweet black and green theme)", "checkbox", DoThis)
        }
    }

    function RemoveUntrusted(DoThis){
        GM.setValue("RemoveUntrusted", DoThis);
        if(DoThis == true){
            $("li[class*='list-entry']").each(function(){
                if( !$(this).html().match(/alt=\"Trusted\"|alt=\"VIP\"|alt=\"Helper\"|alt=\"Moderator\"|alt=\"Supermod\"|alt=\"Admin\"/gi) ){
                    $(this).remove();
                }
            });
        }
        AddSetting("RemoveUntrusted", "Remove untrusted users (i.e. users without a trusted skull etc.)", "checkbox", DoThis)
    }

    function RemoveFooter(DoThis){
        GM.setValue("RemoveFooter", DoThis);
        if(DoThis == true){
            $("footer").remove();
        }
        AddSetting("RemoveFooter", "Remove footer (i.e. Forum, TOR, Bitcoin links etc.)", "checkbox", DoThis)
    }

    function BiggerFont(DoThis){
        GM.setValue("BiggerFont", DoThis);
        if(DoThis == true){
            $(".view-single").addClass("view-double").removeClass("view-single");
        }
        AddSetting("BiggerFont", "Increase the font size in the torrent list", "checkbox", DoThis)
    }

    function ShrinkDescription(DoThis){
        GM.setValue("ShrinkDescription", DoThis);
        if(DoThis == true){
            $("div#description_text").toggle();
            $("<a />", {
                "text": "↕ Hide/Show Description",
                "href": "#",
                "class": "links",
                "style": "margin-left:15px;border-bottom:0px!important;"
            }).on("click", function(e){
                e.preventDefault();
                $("div#description_text").toggle();
            }).insertBefore("div#description_text");
        }
        AddSetting("ShrinkDescription", "Shrink (Hide/Show) the torrent description box.", "checkbox", DoThis)
    }

    function ShrinkFileList(DoThis){
        GM.setValue("ShrinkFileList", DoThis);
        if(DoThis == true){
            $("div#filelist").toggle();
            $("<a />", {
                "text": "↕ Hide/Show File List",
                "href": "#",
                "class": "links",
                "style": "margin-left:15px;border-bottom:0px!important;"
            }).on("click", function(e){
                e.preventDefault();
                $("div#filelist").toggle();
            }).insertBefore("div#filelist");
        }
        AddSetting("ShrinkFileList", "Shrink (Hide/Show) the file list below the description box.", "checkbox", DoThis)
    }

    function RemoveZeroSeeds(DoThis){
        GM.setValue("RemoveZeroSeeds", DoThis);
        if(DoThis == true){
            $("span.list-item.item-seed").each(function(){
                if($(this).text() == "0"){
                    $(this).parent().remove();
                }
            })
        }
        AddSetting("RemoveZeroSeeds", "Remove torrents that have zero seeds.", "checkbox", DoThis)
    }

    function FixRowColours(DoThis){
        GM.setValue("FixRowColours", DoThis);
        if(DoThis == true){
           $("li.list-entry").each(function(e){
               $(this).removeClass("alt");
               if((e % 2) == "1"){
                   $(this).addClass("alt");
               }
           })
        }
        (async () => {
            let DoThisAgain = await GM.getValue("DarkMode", false)
            DarkMode(DoThisAgain, true);
        })();
        AddSetting("FixRowColours", "Re-alternate the torrent row colours.", "checkbox", DoThis)
    }

    function HideUploader(DoThis){
        GM.setValue("HideUploader", DoThis);
        if(DoThis == true){
            (async () => {
                let filterList = await GM.getValue("HideUploader_List", "");
                filterList = filterList.split('\n')
                $("span.list-item.item-user").each(function(){
                    let itemValue = $(this).text();
                    if(filterList.includes(itemValue)){
                        $(this).parent().remove();
                    }
                });
            })();
        }
        AddSetting("HideUploader", "Remove users that you don't like torrents from (e.g. aXXo, YIFY, Anonymous etc.) CASE SENSITIVE", "wordlist", DoThis)
    }

    function KeywordFilter(DoThis){
        GM.setValue("KeywordFilter", DoThis);
        if(DoThis == true){
            (async () => {
                let filterList = await GM.getValue("KeywordFilter_List", "");
                filterList = filterList.split('\n')
                $("span.list-item.item-name").each(function(){
                    let itemValue = $(this).text();
                    if( filterList.some(word => itemValue.includes(word)) ){
                        $(this).parent().remove();
                    }
                });
            })();
        }
        AddSetting("KeywordFilter", "Remove torrents that contain certain words (e.g. 480p, DVD, .TS. etc.) CASE SENSITIVE", "wordlist", DoThis)
    }

    function AddSetting(name, desc, type, value){
        var newDiv = $("<div />", {
            "style": "margin-bottom:10px;"
        });
        let isChecked = value == true ? true : false;
        let newElement = $("<label />", {
            "text": desc,
            "for": "tpbc_" + name
        });
        let newCheck = $("<input />", {
            "type": "checkbox",
            "id": "tpbc_" + name,
            "checked": isChecked,
            "style": "margin-right:10px;"
        });
        newCheck.on("click", function(e){
            GM.setValue(name, this.checked);
            $("#" + name + "_List").prop("disabled", !this.checked);
        });
        newCheck.prependTo(newElement);
        newElement.appendTo(newDiv);
        if (type=="wordlist"){
            (async () => {
                let wordListVals = await GM.getValue(name + "_List", "");
                let wordList = $("<textarea />", {
                    "id": name + "_List",
                    "rows": 5,
                    "style": "width:100%; resize:none; background-color:#242424;color:#fff;",
                    "text": wordListVals,
                    "disabled": (!isChecked),
                    "placeholder": "Using this feature may slow down page load times"
                });
                wordList.on("keyup", function(e){
                    GM.setValue(name + "_List", $(this).val());
                });
                wordList.appendTo(newDiv);
            })();
        }
        newDiv.appendTo("div#TPBCleaner.pico-content");
    }

    function SettingsWindow(){
        const picoWindow = picoModal({
            modalId: "TPBCleaner",
            content: "<h2 style='padding:5px; background:#242424;'>TPBC Settings</h2>",
            width: "750px",
            focus: true,
            modalStyles: {
                "background-color": "#121212",
                "color": "#fff",
                "padding": "10px",
                borderRadius: "5px", border: "1px solid #02800e"
            },
            closeStyles: {
                position: "absolute", top: "-10px", right: "-10px",
                "color": "#fff",
                background: "#121212", padding: "5px 10px", cursor: "pointer",
                borderRadius: "5px", border: "1px solid #02800e"
            }
        }).afterClose((modal, event) => {
            location.reload();
        }).buildDom();
        let SettingsLink = $("<a />", {
            text: "The Pirate Bay Cleaner",
            title: "The Pirate Bay Cleaner Settings",
            href: "TPBC ⚙"
        });
        SettingsLink.on("click", function(e){
            e.preventDefault();
            picoWindow.show();
        });
         $("<img />", {
             src: "https://i.imgur.com/eRocXXL.png",
             style: "margin-left:5px; vertical-align: bottom"
        }).appendTo(SettingsLink)
        $("nav").append(" | " ).append(SettingsLink);
    }

    function Load(){
        console.clear();
        (async () => {
            SettingsWindow();
            RemoveAds( await GM.getValue("RemoveAds", true) );
            FullSize( await GM.getValue("FullSize", true) );
            RemovePorn( await GM.getValue("RemovePorn", false) );
            RemoveUntrusted( await GM.getValue("RemoveUntrusted", true) );
            RemoveFooter( await GM.getValue("RemoveFooter", true) );
            RemoveZeroSeeds( await GM.getValue("RemoveZeroSeeds", true) );
            ShrinkDescription( await GM.getValue("ShrinkDescription", true) );
            ShrinkFileList( await GM.getValue("ShrinkFileList", true) );
            RemoveZeroSeeds( await GM.getValue("RemoveZeroSeeds", true) );
            BiggerFont( await GM.getValue("BiggerFont", true) );
            DarkMode( await GM.getValue("DarkMode", false) );
            HideUploader( await GM.getValue("HideUploader", false) );
            KeywordFilter( await GM.getValue("KeywordFilter", false) );
            FixRowColours( await GM.getValue("FixRowColours", false) );
        })();
    }

    Load();

})();
