export default class LeagueView {
    constructor() {}

    /**
     * Manipulate all essential DOM elements for League preview and insert it on a parent element.
     *
     * @param {HTMLDivElement} parent_el - The parent HTML element where manipulated DOM will be inserted.
     * @param {object} league_details - An object of all data of a league.
     * @returns {object} - The reference of all manipulated DOM elements.
     */
    async manipulateDOM(parent_el, league_details) {
        try {
            const gender_wise_image = ["./img/male.png", "./img/female.png"];
            const all_fanart_image = [
                "strFanart1",
                "strFanart2",
                "strFanart3",
                "strFanart4",
            ];
            parent_el.innerHTML = `
            <section id="leagueSection" class="league-section">
                <div class="banner-container">
                    <div class="league-logo-container">
                        <img
                            src="${league_details.strBadge}"
                            alt="${league_details.strLeague}"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="league-details-container">
                        <div class="league-text">
                            <h2>${league_details.strLeague}</h2>
                            <ul>
                                <li>
                                    <i class="fa fa-calendar-alt"></i>
                                    <h4>founded: ${
                                        league_details.intFormedYear
                                    }</h4>
                                </li>
                                <li>
                                    <i class="fa fa-flag"></i>
                                    <h4>country: ${
                                        league_details.strCountry
                                    }</h4>
                                </li>
                                <li>
                                    <i class="fas fa-futbol"></i>
                                    <h4>type: ${league_details.strSport}</h4>
                                </li>
                                <li>
                                    <i class="fa fa-mars"></i>
                                    <h4>gender: ${league_details.strGender}</h4>
                                </li>
                            </ul>
                        </div>
                        <div class="league-image">
                            <img src="${
                                league_details.strGender === "Male"
                                    ? gender_wise_image[0]
                                    : gender_wise_image[1]
                            }" alt="${league_details.strGender}" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="league-description">
                        <p>${league_details.strDescriptionEN}</p>
                    </div>
                    <div class="league-social-links">
                        <ul>
                            <li>
                                <a href="${
                                    league_details.strFacebook
                                }"><i class="fab fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="${
                                    league_details.strTwitter
                                }"><i class="fab fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="${
                                    league_details.strYoutube
                                }"><i class="fab fa-youtube"></i></a>
                            </li>
                            <li>
                                <a href="${
                                    league_details.strWebsite
                                }"><i class="fa fa-globe"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="row">
                    <div class="soccer-items-heading-container">
                        <h2 id="soccerItemsHeading">all teams</h2>
                    </div>
                    <div
                        id="soccerItemsContainer"
                        class="soccer-items-container"
                    ></div>
                </div>
            </section>
            `;
            const league_section = document.getElementById("leagueSection");
            const banner_container =
                document.querySelector(".banner-container");
            const soccer_items_heading =
                document.getElementById("soccerItemsHeading");
            const soccer_items_container = document.getElementById(
                "soccerItemsContainer"
            );
            banner_container.style.background = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
                url(${
                    league_details[
                        all_fanart_image[
                            Math.floor(Math.random() * all_fanart_image.length)
                        ]
                    ]
                })`;
            banner_container.style.backgroundPosition = "center";
            banner_container.style.backgroundRepeat = "no-repeat";
            banner_container.style.backgroundSize = "cover";
            throw {
                league_section,
                banner_container,
                soccer_items_heading,
                soccer_items_container,
            };
        } catch (err) {
            return err;
        }
    }

    /**
     * Render all soccer league items into soccer items container.
     *
     * @param {HTMLCollection} DOMObj
     * @param {ImageData} teamImage
     * @param {string} teamName
     * @param {string} teamType
     * @param {number} teamIndex
     * @returns {object}
     */
    async renderAllTeams(DOMObj, teamImage, teamName, teamType, teamIndex) {
        try {
            DOMObj.soccer_items_container.innerHTML += `
                <div class="soccer-item">
                    <div class="soccer-item-image">
                        <img src="${teamImage}" alt="${teamName}" />
                    </div>
                    <div class="soccer-item-text">
                        <h3>name: ${teamName}</h3>
                        <h4>type: ${teamType}</h4>
                    </div>
                    <div class="soccer-item-button">
                        <button
                            id="btnExploreTeam"
                            class="btn-explore"
                            data-item="${teamIndex}"
                        >
                            explore
                        </button>
                    </div>
                </div>
             `;
            DOMObj.btn_explore_team = [
                ...document.querySelectorAll("#btnExploreTeam"),
            ];
            throw DOMObj;
        } catch (err) {
            return err;
        }
    }
}
