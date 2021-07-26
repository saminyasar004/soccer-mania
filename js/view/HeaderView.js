/**
 * Title: HeaderView Object
 * Description: Controls all about header view
 * Author: Samin Yasar
 * Date: 24/July/2021
 */

export default class HeaderView {
    /**
     * Controls all stuff for header view.
     *
     */
    constructor() {
        this.api_key = 1;
        this.api_base_URL = `https://www.thesportsdb.com/api/v1/json/${this.api_key}/`;

        this.api_URLs = {
            allSportsList: `${this.api_base_URL}all_sports.php`,
            allLeagueList: `${this.api_base_URL}all_leagues.php`,
            /**
             *
             * @param {string} leagueName
             * @return {URL}
             */
            allTeamsInALeague: function (leagueName) {
                return `${this.api_base_URL}search_all_teams.php?l=${leagueName
                    .split(" ")
                    .join("%20")}`;
            },
            /**
             *
             * @param {number} teamId
             * @return {URL}
             */
            searchByTeamId: function (teamId) {
                return `${this.api_base_URL}lookupteam.php?id=${teamId}`;
            },
            /**
             *
             * @param {number} leagueId
             * @return {URL}
             */
            searchByLeagueId: function (leagueId) {
                return `${this.api_base_URL}lookupleague.php?id=${leagueId}`;
            },
        };
    }

    /**
     * Manipulate all essential DOM elements for Header preview and insert it on a parent element.
     *
     * @param {HTMLDivElement} parent_el - The parent HTML element where manipulated DOM will be inserted.
     * @returns {object} - The reference of all manipulated DOM elements.
     */
    async manipulateDOM(parent_el) {
        try {
            parent_el.innerHTML = `
            <section id="headerSection" class="header-section">
                <div class="banner-container">
                    <h1>Soccer Mania ⚽</h1>
                </div>
                <div class="row">
                    <div class="soccer-items-heading-container">
                        <h2 id="soccerItemsHeading">all soccer leagues</h2>
                    </div>
                    <div
                        id="soccerItemsContainer"
                        class="soccer-items-container"
                    ></div>
                </div>
            </section>
        `;
            const header_section_el = document.getElementById("headerSection");
            const soccer_items_heading_el =
                document.getElementById("soccerItemsHeading");
            const soccer_items_container_el = document.getElementById(
                "soccerItemsContainer"
            );
            throw {
                header_section_el,
                soccer_items_heading_el,
                soccer_items_container_el,
            };
        } catch (err) {
            return err;
        }
    }

    /**
     * Fetch all excepted leagues details and return it.
     *
     * @param {string[]} excepted_leagues
     * @return {object[]}
     */
    async getAllLeagues(excepted_leagues) {
        try {
            const respnose_for_short_leagues = await fetch(
                this.api_URLs.allLeagueList
            );
            const data_for_short_leagues =
                await respnose_for_short_leagues.json();
            const soccer_short_leagues = [];
            const leagues_details = [];
            for (let i = 0; i < data_for_short_leagues.leagues.length; i++) {
                if (
                    excepted_leagues.includes(
                        data_for_short_leagues.leagues[i].strLeague
                    )
                ) {
                    soccer_short_leagues.push(
                        await data_for_short_leagues.leagues[i]
                    );
                }
            }
            for (let i = 0; i < soccer_short_leagues.length; i++) {
                try {
                    const response_for_league_details = await fetch(
                        this.api_URLs.searchByLeagueId.call(
                            this,
                            soccer_short_leagues[i].idLeague
                        )
                    );
                    const data_for_league_details =
                        await response_for_league_details.json();
                    leagues_details.push(
                        ...(await data_for_league_details.leagues)
                    );
                } catch (err) {
                    return err;
                }
            }
            throw leagues_details;
        } catch (err) {
            return err;
        }
    }

    /**
     * Return a list of all teams in a league
     *
     * @param {URL} api_URL
     * @return {}
     */
    async allTeamsInALeague(api_URL) {
        try {
            const response = await fetch(api_URL);
            const data = await response.json();
            throw data;
        } catch (err) {
            return err;
        }
    }

    /**
     * Render all soccer league items into soccer items container.
     *
     * @param {HTMLCollection} DOMObj
     * @param {ImageData} leagueImage
     * @param {string} leagueName
     * @param {string} leagueType
     * @param {number} leagueIndex
     * @returns {object}
     */
    async renderAllLeagues(
        DOMObj,
        leagueImage,
        leagueName,
        leagueType,
        leagueIndex
    ) {
        try {
            DOMObj.soccer_items_container_el.innerHTML += `
                <div class="soccer-item"">
                    <div class="soccer-item-image">
                        <img src="${leagueImage}" alt="${leagueName}" />
                    </div>
                    <div class="soccer-item-text">
                        <h3>name: ${leagueName}</h3>
                        <h4>type: ${leagueType}</h4>
                    </div>
                    <div class="soccer-item-button">
                        <button id="btnExploreLeague" class="btn-explore" data-item="${leagueIndex}">explore</button>
                    </div>
                </div>
            `;
            DOMObj.btn_explore_league = [
                ...document.querySelectorAll("#btnExploreLeague"),
            ];
            throw DOMObj;
        } catch (err) {
            return err;
        }
    }
}
