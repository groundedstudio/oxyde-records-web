// guestmixFeed.js
// The react component which renders the feed of guestmixes.
'use strict';

const e = React.createElement;

function TrackElement (props) {
    // Iterate over artists on track and add each one.
    var artists = []
    for (var i = 0; i < props.artistUrls.length; i++) {
        if (i === (props.artistUrls.length - 1)) {
            artists.push(<a href={props.artistUrls[i]} key={props.artistNames[i]}>{props.artistNames[i]}</a>)
        } else {
            artists.push(<span key={props.artistNames[i]}><a href={props.artistUrls[i]}>{props.artistNames[i]}</a>, </span>)
        }
    }
    return(
        <div className="trackElement">
            <h3 className="trackHeadline">{props.title} - {artists}</h3>
            <p className="trackElementDesc">{props.desc}</p>
            <iframe width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${props.sctrackid}&color=%23d0021b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}></iframe>
        </div>
    )
}

class GuestmixFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { retreivedItems: false };
    }

    componentDidMount() {
        fetch('/static/data/guest_mixes.json', {method: 'GET'}).then(res => {
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
            const tracks = this.state.releases.map((track) => {
                return(
                    <TrackElement
                        title={track.title}
                        artistNames={track.artistNames}
                        artistUrls={track.artistUrls}
                        releaseDate={track.releaseDate}
                        desc={track.desc}
                        sctrackid={track.sctrackid}
                        key={track.title}
                    />
                )
            })
            return (
                <div>
                    {tracks}
                </div>
            )
        }
    }
}

const domContainer = document.querySelector('#guestmixFeed');
ReactDOM.render(e(GuestmixFeed), domContainer);
