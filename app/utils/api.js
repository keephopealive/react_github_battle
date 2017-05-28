import axios from 'axios';
const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?clinet_id=${id}&client_secret=${sec}`;

function getProfile(username){
    // return axios.get(`https://api.github.com/users/${username}${params}`)
    return axios.get(`https://api.github.com/users/${username}`)
    .then( (user) => {
        return user.data;
    })
}
function getRepos(username){
    // return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then( (user) => {
        return user.data;
    })
}
function getStarCount(repos){
    return repos.reduce( (count, repo)=>{
        return count + repo.stargazers_count;
    }, 0)
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
function getUserData(player){
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then( (data) => {
        console.log(data)
        let profile = data[0];
        let repos = data[1];

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    })
}
function sortPlayers(players){
    return players.sort( (a,b) => {
        return b.score - a.score;
    })
}

module.exports = {
    battle: (players) => {
        return axios.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError);
    },
    fetchPopularRepos: (language) => {
        var encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=start:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
        
        return axios.get(encodedURI)
        .then( response => { 
            return response.data.items;
        })
    }
}
