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
	 * @param {Array.<SE>} fallbackSites - Use these SEs as default if
	 * chrome.storage API fails to load default SEs.
	 *
	 * @param {SE} fallbackSite - Use this SE as default SE if
	 * chrome.storage API fails to load default SE.
	 *
	 * @param {boolean} isSyncEnabled - Initialize save method, if
	 * it's set to true, SmartSearch saves the settings with 
	 * `chrome.storage.sync` otherwise, it'll use `chrome.storage.local` API.
	 */
	constructor(fallbackSites, fallbackSite, isSyncEnabled = false) {
		this.sites = fallbackSites
		this.site = fallbackSite
		this.isSyncEnabled = isSyncEnabled
	}

	/**
	 * Search with a SE
	 */
	#searchWithSE = /([\w0-9]+)[\v\t ]+(.*)/
	/**
	 * RegEx expression of 'Add a SE to this.sites'...
	 */
	#addSE = /^(\+)([\w\d]+)[\s\t\v]+["']?([\w\d\s]+)["']?[\s\t\v]+(.*)/

	/**
	 * Gets the current settings.
     *
	 * @returns {Settings}
	 */
	#data() {
		return new Settings(this.sites, this.site, this.isSyncEnabled)
	}

	/**
	 * Saves current settings with chrome.storage.StorageArea API. 
	 * StorageArea is picked by the value of *isSyncEnabled*, if it's true 
	 * then 'sync', else 'local'.
	 * 
	 * @param {Boolean} isSyncEnabled - Determines whether to use
	 * 'chrome.storage.sync' or 'chrome.storage.local' API.
	 */
	#save(isSyncEnabled = this.isSyncEnabled) {
		if (isSyncEnabled) chrome.storage.sync.set(
				this.#data().toObj(),
				_ => {
					console.log("Saved (sync)!..", this.#data().toObj())
				});
		else chrome.storage.local.set(
				this.#data().toObj(),
				_ => {
					console.log("Saved (local)!..", this.#data().toObj())
				});
	}

	/**
	 * Loads the saved settings via *chrome.storage* API.
	 *
	 * @param {Boolean} isSyncEnabled - Determines whether to use
	 * 'chrome.storage.sync' or 'chrome.storage.local' API.
	 * 
	 * @param {Boolean} firstInstall - Check if the user saved anything in
	 * the cloud, and load everything from the cloud if the user left the sync
	 * option true.
	 */
	#load(isSyncEnabled = this.isSyncEnabled, firstInstall = false) {
		const assign = obj => {
			let settings = Settings.fromObj(obj)
			this.sites = settings.sites
			this.site = settings.site
			this.isSyncEnabled = settings.sync
		}
		if (isSyncEnabled) chrome.storage.sync.get(
				Object.keys(this.#data().toObj()),
				res => {
					console.log('Result (sync):', res)
					assign(res)
					if (firstInstall && 
							Settings.isValidObj(res) &&
							res["sync"] === true) {
						this.isSyncEnabled = true
						this.#save(false);
					}
				});
		else chrome.storage.local.get(
				Object.keys(this.#data().toObj()),
				res => {
					console.log('Result (local):', res)
					assign(res)
				});
	}

	/**
	 * Get settings from the cloud on first install.
	 */
	#onFirstInstall() {
		chrome.runtime.onInstalled.addListener(details => {
			if (details.reason === chrome.runtime.OnInstalledReason.INSTALL)
				this.#load(true, true);
		})
	}

	/**
	 * Depending on the entered text, it may do the followings:
	 * - Search sth. on the default SE,
	 * - Search sth. on the specified SE,
	 * - Change SS settings such as enabling or disabling synchronization,
	 * - and etc.
	 */
	#onInputEntered() {
		/**
		 * Navigates to given url at current or set disposition.
		 * 
		 * @param {String} url 
		 * @param {chrome.omnibox.OnInputEnteredDisposition} disposition 
		 */
		const navigate = (url, disposition) => {
			switch (disposition) {
				case "currentTab":
					chrome.tabs.update({url});
					break;
				case "newForegroundTab":
					chrome.tabs.create({url, active: true});
					break;
				case "newBackgroundTab":
					chrome.tabs.create({url, active: false});
					break;
			}
		}
		chrome.omnibox.onInputEntered.addListener((text, disposition) => {
			const navDefault = x => navigate(
					this.site.url.replace("{%query%}", x),
					disposition
				)
			let _resSearchWithSE = text.match(this.#searchWithSE)
			if (_resSearchWithSE != null && _resSearchWithSE.length === 3) {
				let _res = this.sites.filter(e => 
						e.codename === _resSearchWithSE[1])
				/* Pick the first one occurance... */
				if (_res.length >= 1) {
					navigate(
							_res[0].url.replace("{%query%}",_resSearchWithSE[2]),
							disposition)
				}
				/* In case of no match, navigate to default... */
				else navDefault(text);
			}
			else navDefault(text);
		})
	}

	/**
	 * Sets the default suggestion of omnibox.
	 * 
	 * @param {String} suggestion 
	 */
	#setDefaultSuggestion(suggestion) {
		if (suggestion != null) chrome.omnibox.setDefaultSuggestion({
					"description": suggestion
				})
		else throw `Invalid suggestion passed. Suggestion should not be empty.`
	}

	/**
	 * Initialize everything.
	 */
	init() {
		this.#onFirstInstall();
	}

	/**
	 * TODO update documentation...
	 * initializes, addsListeners to omnibox, and etc...
	 */
	run() {
		this.#onInputEntered()
	}
}
