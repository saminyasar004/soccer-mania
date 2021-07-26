export default class TeamView {
    constructor() {}

    /**
     * Manipulate all essential DOM elements for Team preview and insert it on a parent element.
     *
     * @param {HTMLDivElement} parent_el - The parent HTML element where manipulated DOM will be inserted.
     * @param {object} team_details - An object of all data of a team.
     * @returns {object} - The reference of all manipulated DOM elements.
     */
    async manipulateDOM(parent_el, team_details) {
        try {
            const gender_wise_image = ["./img/male.png", "./img/female.png"];
            const all_fanart_image = [
                "strTeamFanart1",
                "strTeamFanart2",
                "strTeamFanart3",
                "strTeamFanart4",
            ];
            const banner_image_source =
                team_details[
                    all_fanart_image[
                        Math.floor(Math.random() * all_fanart_image.length)
                    ]
                ] !== null
                    ? team_details[
                          all_fanart_image[
                              Math.floor(
                                  Math.random() * all_fanart_image.length
                              )
                          ]
                      ]
                    : "../img/banner.jpg";

            parent_el.innerHTML = `
            <section id="teamSection" class="team-section">
                <div class="banner-container">
                    <div class="team-logo-container">
                        <img
                            src="${team_details.strTeamBadge}"
                            alt="${team_details.strTeam}"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="team-details-container">
                        <div class="team-text">
                            <h2>${team_details.strTeam}</h2>
                            <ul>
                                <li>
                                    <i class="fa fa-calendar-alt"></i>
                                    <h4>founded: ${
                                        team_details.intFormedYear
                                    }</h4>
                                </li>
                                <li>
                                    <i class="fa fa-flag"></i>
                                    <h4>country: ${team_details.strCountry}</h4>
                                </li>
                                <li>
                                    <i class="fas fa-futbol"></i>
                                    <h4>type: ${team_details.strSport}</h4>
                                </li>
                                <li>
                                    <i class="fa fa-mars"></i>
                                    <h4>gender: ${team_details.strGender}</h4>
                                </li>
                            </ul>
                        </div>
                        <div class="team-image">
                            <img src="${
                                team_details.strGender === "Male"
                                    ? gender_wise_image[0]
                                    : gender_wise_image[1]
                            }" alt="${team_details.strGender}" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="team-description">
                        <p>${team_details.strDescriptionEN}</p>
                    </div>
                    <div class="team-social-links">
                        <ul>
                            <li>
                                <a href="${
                                    team_details.strFacebook
                                }"><i class="fab fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="${
                                    team_details.strTwitter
                                }"><i class="fab fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="${
                                    team_details.strYoutube
                                }"><i class="fab fa-youtube"></i></a>
                            </li>
                            <li>
                                <a href="${
                                    team_details.strWebsite
                                }"><i class="fa fa-globe"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            `;
            const team_section = document.getElementById("teamSection");
            const banner_container =
                document.querySelector(".banner-container");
            banner_container.style.background = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
                url(${banner_image_source})`;
            banner_container.style.backgroundPosition = "center";
            banner_container.style.backgroundRepeat = "no-repeat";
            banner_container.style.backgroundSize = "cover";

            throw {
                team_section,
                banner_container,
            };
        } catch (err) {
            return err;
        }
    }
}
