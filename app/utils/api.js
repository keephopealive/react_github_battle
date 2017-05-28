import axios from 'axios';
const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?clinet_id=${id}&client_secret=${sec}`;

async function getProfile(username){
    // return axios.get(`https://api.github.com/users/${username}${params}`)
    try {
        const user = await axios.get(`https://api.github.com/users/${username}`)
        return user.data;
    } catch (err) {
        console.warn("Error: ", err);
    }
}
async function getRepos(username){
    // return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    try {
        const user = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
        return user.data;
    } catch (err) {
        console.warn("Error: ", err);
    }
}
function getStarCount(repos){
    return repos.reduce( (count, repo) => count + repo.stargazers_count, 0)
}
function calculateScore(profile, repos) {
    let followers = profile.followers;
    let totalStars = getStarCount(repos);
    return (followers * 3) + totalStars;
}
function handleError(error){
    console.warn(error);
    return null;
}
async function getUserData(player){
    try {
        const data = await axios.all([getProfile(player),getRepos(player)])
        let profile = data[0];
        let repos = data[1];

        return {
            profile,
            score: calculateScore(profile, repos)
        }
    } catch (err) {
        console.warn('Error: ', err);
    }
}
function sortPlayers(players){
    return players.sort( (a,b) => b.score - a.score )
}

export async function battle (players) {
    try {
        const results = await Promise.all(players.map(getUserData))
        return results === null 
        ? results
        : sortPlayers(results);
    } catch (err) {
        console.warn("Error: ", err);
    }
}
export function fetchPopularRepos (language) {
    var encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=start:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    
    return axios.get(encodedURI)
    .then( response => response.data.items )
}
