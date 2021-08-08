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
 * Holds the configuration of this extension...
 */
class Settings{
	/**
	 * @param {Array.<SE>} sites - Saves the default sites.
	 * @param {SE} site - Saves the default site.
	 * @param {boolean} isSyncEnabled - Saves the info about local or sync to be used.
	 */
    constructor(sites, site, isSyncEnabled) {
        this.sites = sites
        this.site = site
        this.sync = isSyncEnabled
    }
}