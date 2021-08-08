/*
 *  Smart Search - An elegant way search on browsers...
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
 * SE: Abbreviation of "Search Engine"
 * 
 * Holds a codename, actual name, and the url...
 *
 */
class SE {
	/**
	 * URL should contain this string, will be used to replace it and generate
	 * an URL
	 */
	static #PLACEHOLDER = "{%query%}"
	/**
	 * @param {String} codename - used on omnibox searches to reduce typing.
	 * @param {String} name - name of the search engine.
	 * @param {String} url - url which should contain `{%query%}` in order to 
	 * generate the right uri with the given search query...
	 */
	constructor(codename, name, url) {
		this.codename = codename
		this.name = name
		if (url.includes(SE.#PLACEHOLDER)) {
			this.url = url
		}
		else {
			// TODO send an error, url is not valid...
		}
	}
	/**
	 * Generates URL by replacing url's "{%query%}" with the given query...
	 * @param {String} query - used to generate the uri with this
	 */
	generateUrlWithQuery(query) {
	}
}
