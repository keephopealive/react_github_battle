import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';


function Profile({info}){

    return (
        <PlayerPreview username={info.login} avatar={info.avatar_url}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}
Profile.propTypes = {
    info: PropTypes.object.isRequired
}

function Player({label, score, profile}) {
    return (
        <div>
            <h1 className='header'>{label}</h1>
            <h3 style={{textAlign:'center'}}>Score: {score}</h3>
            <Profile info={profile}/>
        </div>
    )
}
Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired
}



class Results extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    async componentDidMount(){
        const { playerOneName, playerTwoName } = parse(this.props.location.search)
        try {  
            const players = await battle([playerOneName, playerTwoName])
            return players === null 
            ? this.setState(() => (
                {
                    error: 'Error, check if both users exist on Github',
                    loading: false
                }
            ))
            : this.setState( () => (
                {
                    error: null,
                    winner: players[0],
                    loser: players[1],
                    loading: false
                }
            ))
        } catch (err) {
            console.warn("Error ", err);
        }
    }
    render(){
        let error = this.state.error;
        let winner = this.state.winner;
        let loser = this.state.loser;
        let loading = this.state.loading;

        if (loading === true ){
            return <Loading />
        }
        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Battle</Link>
                </div>
            )
        }

        return (
            // <div>{JSON.stringify(this.state)}</div>
            <div className='row'>
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}

export default Results;