// #######################################################################################
import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';
// #######################################################################################




// #######################################################################################
class SelectLanguage extends React.Component {
    render () {
        let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Python'];

        return (
            <ul className='languages'>
                {languages.map( lang => {
                    return (
                        <li 
                        key={ lang } 
                        style={ lang === this.props.selectedLanguage ? {color: '#d0021b'} : null }
                        onClick={ this.props.onSelect.bind(null, lang) }>
                            { lang }
                        </li>
                    )
                })}
            </ul>
        )
    }
}
SelectLanguage.PropTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}
// #######################################################################################

// #######################################################################################
function RepoGrid(props){
    return (
        <ul className='popular-list'>
            { props.repos.map( (repo, index) => {
                return (
                    <li 
                    key={repo.name} 
                    className='popular-item'>
                        <div className='popular-rank'># {index+1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img 
                                    className='avatar' 
                                    src={repo.owner.avatar_url} 
                                    alt={'Avatar for ' + repo.owner.login}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            }) }
        </ul>
    )
}
RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}
// #######################################################################################



// #######################################################################################
class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }
    async updateLanguage(lang) {
        this.setState( () => {
            return {
                selectedLanguage: lang,
                repos: null
            }
        })
        try {
            const repos = await fetchPopularRepos(lang)
            this.setState( () => {
                return {
                    repos
                }
            })
        } catch (err) {
            console.warn("error: ", err);
        }
        
    }
    render() {
        return (
            <div>
                <SelectLanguage 
                selectedLanguage={this.state.selectedLanguage}
                onSelect={this.updateLanguage}
                />
                {!this.state.repos
                ? <Loading text='Downloading' speed={30} />
                : <RepoGrid repos={this.state.repos} /> }
            </div>
        )
    }
}
// #######################################################################################

export default Popular;