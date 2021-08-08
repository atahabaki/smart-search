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
 * Creates an SmartSearch application...
 */
class SmartSearch {
	/**
	 * @param {Array.<SE>} fallbackSites - Use these SEs as default if browser.storage
	 * API fails to load default SEs.
	 * @param {SE} fallbackSite - Use this SE as default SE if browser.storage API
	 * fails to load default SE.
	 * @param {boolean} isSyncEnabled - Initialize save method, if it's set to true,
	 * SmartSearch saves the settings with `browser.storage.sync` otherwise, it'll use
	 * `browser.storage.local` API.
	 */
	constructor(fallbackSites, fallbackSite, isSyncEnabled = false) {
		this.sites = fallbackSites
		this.site = fallbackSite
		this.isSyncEnabled = isSyncEnabled
	}

	/**
	 * Gets the current settings.
	 * @returns {Settings}
	 */
	#data() {
		return new Settings(this.sites, this.site, this.isSyncEnabled)
	}

	/**
	 * TODO update documentation...
	 * initializes, addsListeners to omnibox, and etc...
	 */
	run() {
	}
}
