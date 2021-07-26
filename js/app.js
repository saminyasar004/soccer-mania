/**
 * Title: Soccer Mania
 * Description: User can see some soccer leagues and their corresponding teams in details
 * Author: Samin Yasar
 * Date: 24/July/2021
 */

// Dependencies

import HeaderView from "./view/HeaderView.js";
import LeagueView from "./view/LeagueView.js";
import TeamView from "./view/TeamView.js";

// Selecting dom element

const root_el = document.getElementById("root");
const pre_loader_section = document.getElementById("preLoaderSection");
const footer_section = document.getElementById("footerSection");

// Global variables

const excepted_leagues = [
    "American Major League Soccer",
    "Bangladesh Premier League",
    "English Premier League",
    "French Ligue 1",
    "Italian Serie A",
    "Spanish La Liga",
];

const soccer_leagues = [];

try {
    const header_view = new HeaderView();
    const league_view = new LeagueView();
    const team_view = new TeamView();
    const header_DOM = await header_view.manipulateDOM(root_el);

    soccer_leagues.push(
        ...[
            ...(await header_view.getAllLeagues.call(
                header_view,
                excepted_leagues
            )),
        ]
    );

    soccer_leagues.forEach(async (league) => {
        try {
            const api_URL_for_teams_in_league =
                await header_view.api_URLs.allTeamsInALeague.call(
                    header_view,
                    await league.strLeague
                );
            const response_for_teams_in_league =
                await header_view.allTeamsInALeague(
                    api_URL_for_teams_in_league
                );
            league.allTeams = await response_for_teams_in_league.teams;
        } catch (err) {
            console.log(err);
        }
    });

    soccer_leagues.sort((a, b) => a.strLeague.localeCompare(b.strLeague));

    soccer_leagues.forEach(async (soccer_league, soccer_league_index) => {
        await header_view.renderAllLeagues(
            header_DOM,
            soccer_league.strBadge,
            soccer_league.strLeague,
            soccer_league.strSport,
            soccer_league_index
        );
    });

    header_DOM.btn_explore_league.forEach((league_btn) => {
        league_btn.addEventListener("click", async (e) => {
            const current_league_index = e.target.getAttribute("data-item");
            root_el.innerHTML = "";
            const league_DOM = await league_view.manipulateDOM(
                root_el,
                soccer_leagues[current_league_index]
            );
            soccer_leagues[current_league_index].allTeams.forEach(
                async (team, teamIndex) => {
                    await league_view.renderAllTeams(
                        league_DOM,
                        team.strTeamBadge,
                        team.strTeam,
                        team.strSport,
                        teamIndex
                    );
                }
            );

            league_DOM.btn_explore_team.forEach((team_btn) => {
                team_btn.addEventListener("click", async (e) => {
                    const current_team_index =
                        e.target.getAttribute("data-item");
                    root_el.innerHTML = "";
                    const team_DOM = await team_view.manipulateDOM(
                        root_el,
                        soccer_leagues[current_league_index].allTeams[
                            current_team_index
                        ]
                    );
                });
            });
        });
    });

    pre_loader_section.style.display = "none";
    root_el.style.display = footer_section.style.display = "inherit";
} catch (err) {
    console.log(err);
}
