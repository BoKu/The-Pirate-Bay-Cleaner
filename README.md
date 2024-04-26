
<h2>Release Information</h2>
<p>Another full rewrite of <strong>The Pirate Bay <i>Cleaner</i></strong></p>
<p>I was never fully into the previous versions of The Pirate Bay Cleaner due to the way the website constantly worked against me with adverts and clicks being hijacked etc. This version is the first version to try and fix that. The code isn't pretty, but it will be refactored later on.</p>
<p>Consider this a public beta, so feedback is welcome.</p>
<p><small>N.B. I've been maintaining this off and on through the last 13 years 😊 (version 1 is lost to time 😔)</small></p>
<details open>
<summary>Screenshots</summary>

<table>
<tr>
<td><img src="https://i.imgur.com/0AulCTU.png" title="right click to view full size" height="150"></td>
<td><img src="https://i.imgur.com/na9vyrY.png" title="right click to view full size" height="150"></td>
</tr>
</table>

</details>

<hr>
<mark><strong>Important Information!</strong></mark>

To use this script, you need to have a Userscript browser extension.
I recommended visiting this page to install Tampermonkey:

https://www.tampermonkey.net/

⚠️ It will soon be necessary to enable developer mode to run userscripts via Tampermonkey.
Instructions on how to enable it can be found here https://www.tampermonkey.net/faq#Q209

<hr>
<details>
<summary>Previous Updates Information</summary>
<h3>***** UPDATED (1st June 2022) *****</h3>
Some minor bug fixes<br />
<br />
<h3>***** UPDATED (3rd May 2022) *****</h3>
Re-added supported for pirateproxy.surf<br />
Added remember downloaded torrent feature.<br />
Fixed screen resolution issues on smaller screen scrolling.<br />
Some minor bug fixes<br />
<br />
I expect version 6 to support 1337x.to and rarbg.to

<h3>***** UPDATED (19th April 2022) *****</h3>
Added a couple new features<br />
Updated required JS libraries<br />
<br />
I expect version 6 to support 1337x.to and rarbg.to

<h3>***** UPDATED (21st November 2020) *****</h3>
Brand new, and rewritten!<br />
Look in the nav menu for the new settings page.<br />
Made it a lot more dynamic for future updates!<br />
<h3>***** UPDATED (14th October 2017) *****</h3>
FIX Script is working again. Code clean up. Few parts rewriten. Update to jQuery 3.2.1 and so on.<br />
<h3>***** UPDATED (22nd February 2015) *****</h3>
*NEW* Add the option to load all comments against a torrent.<br />
<b><i>Thanks Wilis1964</i></b></br>
*NEW* Added the feature that you can filter torrents based on their torrent size.<br />
<b><i>Thanks Moby2kBug</i></b></br>
Updated the script that will only move to HTTPS if requested, the URL will now not leave HTTPS if the checkbox is unticked. HTTPS is best!<br />
*FIX* Removed the PORN tick box and label if you choose to remove porn and don't see DuckDuckGo.<br />
<h3>***** UPDATED (4th August 2014) *****</h3>
The script should now work on all of the official The Pirate Bay proxy websites, and should grow with the list.<br/>
It works by tracking the Google site verification code that The Pirate Bay uses.
<br/><br/>
<h3>***** UPDATED (7th June 2014) *****</h3>
I changed the namespace, so <b>everyone</b> please note this. I have completely abandoned UserScripts in favour of GreasyFork and have changed the namespace to reflect this.<br /><br />
Got rid of Google search for the more "safe" DuckDuckGo search engine.<br/>
Fixed some minor bugs<br/>
Some code optimisation<br/>
<br/>
<h3>***** UPDATED (6th June 2014) *****</h3>
Changed some code to guarantee that windows that are requested, open instead of being blocked<br /><br />
<h3>***** UPDATED (4th April 2014) *****</h3>
*NEW* Pressing escape will now close lightboxed windows, not the settings window though.<br />
<b><i>Thanks stuK for the idea.</i></b><br /><br />
Also I forgot to tell you all last time, that the decimal time has changed to proper time, so it shows as a real time.<br /><br />
Lastly I've cleaned up a bit more code, stuff that isn't used any more etc.
<br /><br/>
<h3>***** UPDATED (1st April 2014) *****</h3>
*NEW* When clicking magnet links, it now adds the thumbs up, on the main list of torrents.<br />
Cleaned up a bit of the code, removed stuff not being used etc.<br />
Added some more comments into the script, to help people understand what does what.<br /><br />
<h3>***** UPDATED (27th March 2014) *****</h3>
*NEW* There is a new feature to allow for automatic page refreshing.
<br /><br /><img src="https://i.imgur.com/t4SzcAH.png"><br /><br />
<ul>
<li>Slight changes to the popup blocking script.</li>
<li>Changes to the IMDB 'stuff', because now IMDB has changed the way they display their website. It is no longer allowed to be displayed in iFrames.</li>
</ul>
<br /><br />
<b>All Settings Screen</b>
<br /><br /><img src="https://i.imgur.com/evNCji0.png"><br /><br />
<h3>***** UPDATED (24th March 2014) *****</h3>
Added a feature that will automatically (no configuration required) update the popup tracking cookie and sets it to expired in the year 2050, hopefully eliminating the popup for good.<br />
<b><i>Thanks stuK for the idea.</i></b><br /><br />

<h3>***** UPDATED (15th January 2014) *****</h3>
Minor Bug Fix<br /><br />

<h3>***** UPDATED (14th January 2014) *****</h3>

Have added the option to remove all porn<br /><br />
Hopefully have made the filter a lot easier for those of you out there that struggled with it, please see below.<br /><br />
Just separate each word you wish to use as a filter with the pipe symbol |<br /><br />

<img src="https://i.imgur.com/2KSGtS7.png"><br /><br /><br /><br />

If you find any genuine bugs, please leave a discussion!<br /><br />

Thanks<br /><br />

Dave<br /><br />

<h3>***** UPDATED (7th July 2013) *****</h3>
Minor Bug Fix<br /><br />

<h3>***** UPDATED (7th July 2013) *****</h3>
Major Bug Fix, please upgrade to this version!<br /><br />
Very sorry<br /><br />

<h3>***** UPDATED (2nd July 2013) *****</h3>
OK, so, I know I have been a bit slack in the updates of late and I do apologise for that.<br /><br />
Can it please be noted that if you are using any other scripting add-ons/extensions (NoScript for example), please turn that off and see if it fixes any issue you have with this script, before saying "It's broken, fix it".<br /><br />
Moving on, I have had to remove the automatic sorting of seeders and leechers function and put the original feature back on, this should hopefully only be temporary until I can really put some focus on it. I just never use it, so it kind of gets a little over looking sometimes.<br /><br />
YOU HAVE A PORN FILTER :-D ... I'm not sure if it is what you guys/girls want but you can put in your keywords to filter out your beloved porn. It only works under the porn category too, so it shouldn't interfere with "normal" torrents. BUT the normal keyword filter WILL affect the porn channel.<br /><br />
Any changes, needs, wants or desires, please create a discussion and I'll check it soon.<br /><br />
Enjoy peeps! See ya!<br /><br />
<h3>***** UPDATED (10th April 2013) *****</h3>
Minor bug fix<br /><br />
<h3>***** UPDATED (9th April 2013) *****</h3>
New version contains a couple things.<br />
<br />
First off, I really hope the sorting issue is now sorted out once and for all! I do apologize for anyone that has been adversely affected by it!<br />
<br />
I've also migrated to the jQuery 2.0 library. From all my tests so far all seems to work as expected. Keeping in mind that I only support current builds of Chrome and Firefox. If you notice anything let me know please!<br />
<br />
I've added in a CSS update to the favourites box, so that if its empty it should  disappear.<br />
<br />
Another little thing I've added is; if you visit a page where there are no results, if gives you a basic message explaining why. Hopefully this clears up any concerns over a lack of results on certain pages.<br />
<br />
A MASSIVE thank you to <b>stuK</b>, <b>LouisTakePILLz</b> and <b>Benoit H.</b> for alerting to me to bugs and making change requests.<br /><br />
<h3>***** UPDATED (4th May 2013) *****</h3>
OK so I've tried to fix a few bugs<br />
<b><i>Thanks E A</i></b><br /><br />
.. but I've also added a few new features so there might be a couple more, please let me know if you find any.<br /><br />
OK, so the new features:
<ul>
<li>You can save favorite users, just visit a user page and hit the star to fave them. Then you can use the drop down list to quick jump to their page.</li>
<li>Support has been added for Transmission users. It is in the list of torrent clients.</li>
<li>An option to lightbox all links, or at least try to</li>
</ul>
Enjoy :)
<br /><br />
<h3>***** UPDATED (26th Apr 2013) *****</h3>
OK, just a small update to hopefully account for The Pirate Bay's seemingly incessant domain name changes.<br /><br />
<h3>***** UPDATED (25th Apr 2013) *****</h3>
Changed due to ThePirateBay.se changing to ThePirateBay.is<br /><br />
<h3>***** UPDATED (22nd Apr 2013) *****</h3>
Fixed Bug: When using auto sort, you get stuck in loop<br />
<b><i>Thanks equazcion</i></b><br /><br />
<h3>***** UPDATED (19th Apr 2013) *****</h3>
Changed link to download torrent icon<br /><br />
Fixed Bug: When turning off Google search it still appended incorrect text.<br />
<b><i>Thanks Matt777</i></b><br /><br />
<h3>***** UPDATED (11th Apr 2013) *****</h3>
Code reversal due to:<br />
<br />
"In anticipation of having their Swedish domain name seized, this week the crew of The Pirate Bay took evasive action. In the early hours of Tuesday morning they switched to two Greenland-based domains, but already the plan is starting to unravel. The telecoms company in charge of the .GL TLD says it will now block the domains after deciding they will be used illegally."<br />
<b>Source:torrentfreak.com</b>
<br /><br />
<h3>***** UPDATED (9th Apr 2013) *****</h3>

Changed code to work on the new .GL domain
<br /><br />
<h3>***** UPDATED (30th Mar 2013) *****</h3>
<h1>Please see the 3rd screen shot for the list of features (yes a new GUI too :) )</h1>
<br />
If you are having issues with keyword filtering, make sure you have escape everything correctly. e.g.<br />
<br />
\(ts\)|\(TS\)|\.ts\.|\.ts| ts |\.TS\.|\.cam\.|\.cam|cam |hdcam|\.hdcam\.|\sTS\s|\sts\s|vodrip|screener|\.screener\.|TS2DVD|ts2dvd|TELESYNC2DVD|telesync2dvd|720p-ts|720p-TS|TELESYNC|telesync|Telesync|sCAMs|\scam\s|CAMrip|CAMRip|camrip|CAMRIP|dvdscr|DVDScr|DVDSCR|\.DVDSCR|\.DVDSCR\.
<br /><br />
<h3>***** UPDATED (1st Dec 2012) *****</h3>

*NEW* Option to Auto Sort by Seeders.<br />
*NEW* Option to Auto Sort by Leechers.<br />
*NEW* Toggle SSl/HTTPS browsing.<br />
*NEW* Toggle using Google Search or the integrated search (compatible with SSL/HTTPS feature).<br />
*NEW* Full contrast change. Change the theme of The Pirate Bay to Black<br />
*NEW* New icon added for torrent information.<br />
*NEW* New icon added that opens the IMDB page for a movie etc.<br />
*NEW* Fully minified for faster loading.<br />
Auto updates<br />
Tries to block popups.<br />
Removes adverts.<br />
Adds hover-able or click-able cover images.<br />
Highlights recent releases (48 hours).<br />
Removes untrusted sources (based on skulls).<br />
Removes crap movies (based on source). <br />
Gives back the download torrent link.<br />
<br />
If you come across any issues or bugs please feel free to message me at userscripts.org<br /><br />

<h3>***** UPDATED (16th Nov 2012) *****</h3>

Fixed broken resource, which broke install of script<br /><br />

<h3>***** UPDATED (14th Nov 2012)/2 *****</h3>

NEW Icon used for recognition within Greasemonkey extension.<br />
NEW User Script Commands.<br />
1) toggle whether or not you want to hover or click to view the initial cover image.<br />
2) Toggle whether or not you want to see the torrent file link, or just use magnet links. All options are saved for next session.<br />
3) About window so you can easily see which version you are running.<br />
NEW auto update script, using built in Greasemonkey feature (hopefully it works!)
<br />
NEW implemented popup blocker - The Pirate Bay Popup Window Blocker (http://userscripts.org:8080/scripts/show/132940)<br />
UPDATED to use better advert blocking script - The Pirate Bay Ad Remover (http://userscripts.org:8080/scripts/show/89761)<br /><br />

<h3>***** UPDATED (14th Nov 2012)/1 *****</h3>

Removed auto update script as it breaks this script.<br /><br />

<h3>***** UPDATED (12th Nov 2012)/3 *****</h3>

Minor bug fixes.<br /><br />

<h3>***** UPDATED (12th Nov 2012)/2 *****</h3>

Removes banner ads.<br /><br />

<h3>***** UPDATED (12th Nov 2012)/1 *****</h3>

Minor bug fixes.<br /><br />

<h3>***** UPDATED (11th Nov 2012) *****</h3>

Add download torrent back to list.<br /><br />

<h3>***** UPDATED (27th Oct 2012) *****</h3>

Auto updater script added. Every 7 days.<br /><br />

<h3>***** UPDATED (25th Oct 2012) *****</h3>

Made the highlights a bit darker because the yellow was too hard to see on certain screens. 

Hover over the cover image icon to get a preview of it. 

Slightly minified.
</details>
