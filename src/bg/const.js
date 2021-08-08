/*
 *  Smart Search - A web browser extension which is eases the way you search.
 *  Copyright (C) 2021 A. Taha Baki
 *
 *  This file is part of Smart Search.
 *
 *  Smart Search is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Smart Search is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Smart Search.  If not, see <https://www.gnu.org/licenses/>.
*/

/**
 * Before loading the search engines with 'browser.storage' API, 
 * use these SEs as default.
 * @type {Array.<SE>}
 */
const FALLBACK_SEARCH_ENGINES = [
	new SE("ytb", "YouTube", "https://www.youtube.com/results?search_query={%query%}"),
	new SE("ggl", "Google", "https://www.google.com/search?q={%query%}"),
	new SE("bng", "Bing", "https://www.bing.com/search?q={%query%}"),
	new SE("yaho", "Yahoo", "https://search.yahoo.com/?q={%query%}"),
	new SE("dckg", "DuckDuckGo", "https://duckduckgo.com/?q={%query%}"),
	new SE("iconf", "IconFinder", "https://www.iconfinder.com/search/?q={%query%}"),
	new SE("rddt", "Reddit", "https://www.reddit.com/search/?q={%query%}"),
	new SE("gthb", "GitHub", "https://github.com/search?q={%query%}"),
	new SE("adox", "Android Developers", "https://developer.android.com/s/results?q={%query%}"),
]
/**
 * Before loading the default search engine with 'browser.storage' API,
 * use this SE as the default SE.
 * @type {SE}
 */
const FALLBACK_SEARCH_ENGINE = predefined_sites[0];
