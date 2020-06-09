// releaseFeed.js
// The react component which renders the feed of releases.
'use strict';

const e = React.createElement;

function TrackElement (props) {
    return(
        <div className="trackElement">
            <h3 className="trackHeadline">{props.title} - <a href={"/artists?id=" + props.artistId}>{props.artistName}</a></h3>
            <p className="trackElementDesc">{props.desc}</p>
            <iframe width="100%" height="100" scrolling="no" frameBorder="no" allow="autoplay" src={props.ifsrc}></iframe>
        </div>
    )
}

class ReleaseFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { retreivedItems: false };
    }

    componentDidMount() {
        fetch('/static/releases.json', {method: 'GET'}).then(res => {
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
                        artistName={track.artistName}
                        artistId={track.artistId}
                        releaseDate={track.releaseDate}
                        desc={track.desc}
                        ifsrc={track.ifsrc}
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

const domContainer = document.querySelector('#releaseFeed');
ReactDOM.render(e(ReleaseFeed), domContainer);
