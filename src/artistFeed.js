// artistFeed.js
// The artist component which renders a list of artists.
'use strict';

const e = React.createElement;

function ArtistCardElement (props) {
    return (
        <div className="card artistElement">
            <img src={props.coverImgUrl} className="card-img-top" alt={props.name}/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.shortDesc}</p>
                <a href={`?id=${props.id}`} className="btn btn-outline-danger">more info</a>
            </div>
        </div>
    )
};

function ArtistPage (props) {
    // Search through releases to find ones by the artist.
    var artistReleases = [];
    var firstRelease = true;
    for (var i = 0; i < props.releases.length; i++) {
        if (props.releases[i]['artistIds'].includes(props.id)) {
            if (firstRelease) {
                artistReleases.push(
                    <div className="carousel-item active" key={props.releases[i].title}>
                        <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${props.releases[i].sctrackid}&color=%23d0021b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}></iframe>
                    </div>
                )
                firstRelease = false;
                console.log("Pushed first")
            } else {
                artistReleases.push(
                    <div className="carousel-item" key={props.releases[i].title}>
                        <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${props.releases[i].sctrackid}&color=%23d0021b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}></iframe>
                    </div>
                )
                console.log("Pushed not first")
            }
        }
    }

    return (
        <div className="artistProfile">
            <div className="row artistProfileHeadline">
                <h1 className="card-title col">{props.name}</h1>
                <div className="row col artistSocials">
                    <a className="artistSocialLink" href={`https://soundcloud.com/${props.soundcloud}`}><i className="fab fa-soundcloud artistSocialIcon"></i></a>
                    <a className="artistSocialLink" href={`https://instagram.com/${props.instagram}`}><i className="fab fa-instagram artistSocialIcon"></i></a>
                </div>
            </div>
            <div>
                <p>{props.desc}</p>
            </div>
            <h3>Tracks</h3>
            <div id="trackCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {artistReleases}
                </div>
                <a className="carousel-control-prev" href="#trackCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#trackCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}

class ArtistFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { retrievedItems: false, artistSpotlight: null, releases: [] };
    }

    componentDidMount() {
        // Get artist info.
        fetch('/static/data/artists.json', {method: 'GET'}).then(res => {
            return res.json();
        }).then(resJson => {
            this.setState({ retrievedItems: true, artists: resJson });
            // If artistid param in url, show artist spotlight.
            if (Object.keys(resJson).includes(getParams(window.location.href).id)) {
                this.setState({ artistSpotlight: getParams(window.location.href).id})
            }
        }).catch(error => {
            console.error(error);
        });

        // Get releases
        fetch('/static/data/releases.json', {method: 'GET'}).then(res => {
            return res.json();
        }).then(resJson => {
            this.setState({releases: resJson});
        }).catch(error => {
            console.error(error);
        })
    }

    render() {
        if (!this.state.retrievedItems) {
            return (
                <div className="loaderWrapper">
                    <div className="loader"></div>
                </div>
            );
        } else if (this.state.artistSpotlight !== null) {
            return(
                <div>
                    <ArtistPage
                        id={this.state.artistSpotlight}
                        {...this.state.artists[this.state.artistSpotlight]}
                        releases={this.state.releases}
                    />
                </div>
            )
        } else {
            const artists = Object.keys(this.state.artists).map((key, index) => {
                return(
                    <ArtistCardElement
                        id={key}
                        key={key}
                        {...this.state.artists[key]}
                    />
                )
            })
            return (
                <div className="artistCardsWrapper">
                    {artists}
                </div>
            )
        }
    }
}

var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

const domContainer = document.querySelector('#artistFeed');
ReactDOM.render(e(ArtistFeed), domContainer);
