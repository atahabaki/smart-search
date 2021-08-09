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
	 */
	#save() {
		if (this.isSyncEnabled) chrome.storage.sync.set(
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
	 */
	#load(isSyncEnabled = this.isSyncEnabled) {
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
				this.#load(true);
		})
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
	}
}
