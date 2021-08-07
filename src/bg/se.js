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
	constructor(codename, name, url) {
		this.codename = codename
		this.name = name
		this.url = url
	}
}
