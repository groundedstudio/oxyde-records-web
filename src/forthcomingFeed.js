// forthcomingFeed.js
// The react component which renders the feed of tracks soon coming.
'use strict';

const e = React.createElement;

function ForthcomingTrackElement (props) {
    // Iterate over artists on track and add each one.
    var artists = []
    for (var i = 0; i < props.artistIds.length; i++) {
        if (i === (props.artistIds.length - 1)) {
            artists.push(<a href={`/artists/?id=${props.artistIds[i]}`} key={props.artistNames[i]}>{props.artistNames[i]}</a>)
        } else {
            artists.push(<span key={props.artistNames[i]}><a href={`/artists/?id=${props.artistIds[i]}`}>{props.artistNames[i]}</a>, </span>)
        }
    }
    return(
        <div className="card forthcomingElement">
            <img src={props.artUrl} className="card-img-top" alt={props.title}/>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p>{(new Date(props.releaseDate)).toDateString()}</p>
                <p className="card-text">{props.desc}</p>
            </div>
        </div>
    )
}

class ForthcomingFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { retreivedItems: false };
    }

    componentDidMount() {
        fetch('/static/data/forthcoming.json', {method: 'GET'}).then(res => {
            return res.json();
        }).then(resJson => {
            this.setState({retreivedItems: true, releases: resJson});
        }).catch(error => {
            console.error(error);
        })
    }

    render() {
        if (!this.state.retreivedItems) {
            return (
                <div className="loader"></div>
            );
        } else {
            // TODO: For each 2 tracks, wrap in a card-deck div!

            const tracks = this.state.releases.map((track) => {
                return(
                    <ForthcomingTrackElement
                        title={track.title}
                        artistNames={track.artistNames}
                        artistIds={track.artistIds}
                        releaseDate={track.releaseDate}
                        desc={track.desc}
                        artUrl={track.artUrl}
                        key={track.title}
                    />
                )
            })
            return (
                <div>
                    <div className="card-deck">
                        {tracks}
                    </div>
                </div>
            )
        }
    }
}

const domContainer = document.querySelector('#forthcomingFeed');
ReactDOM.render(e(ForthcomingFeed), domContainer);
