const React = require('react');
const queryString = require('query-string');
const api = require('../utils/api');
const Link = require('react-router-dom').Link;
const PropTypes = require('prop-types');
const PlayerPreview = require('./PlayerPreview');
const Loading = require('./Loading');


function Profile(props){
    return (
        <PlayerPreview
            avatar={props.info.avatar_url}
            username={props.info.login}
        >
            <ul class='space-list-items'>
                { props.info.name && <li>{props.info.name}</li>}
                { props.info.location && <li>{props.info.location}</li>}
            </ul>
        </PlayerPreview>
    )
}

function Player() {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{textAlign:'center'}}>Score: {props.score}</h3>
            <Profile info={props.profile}/>
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
    componentDidMount(){
        let players = queryString.parse(this.props.location.search)
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then( (results) => {
            if ( results === null ){
                return this.setState(() => {
                    return {
                        error: 'Error, check if both users exist on Github',
                        loading: false
                    }
                })
            }

            this.setState(()=>{
                return {
                    error: null,
                    winner: results[0],
                    loser: results[1],
                    loading: false
                }
            })
            
        })
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

module.exports = Results;