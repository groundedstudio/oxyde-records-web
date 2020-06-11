// forthcomingFeed.js
// The react component which renders the feed of tracks soon coming.
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

function ForthcomingTrackElement(props) {
    // Iterate over artists on track and add each one.
    var artists = [];
    for (var i = 0; i < props.artistIds.length; i++) {
        if (i === props.artistIds.length - 1) {
            artists.push(React.createElement(
                "a",
                { href: "/artists/?id=" + props.artistIds[i], key: props.artistNames[i] },
                props.artistNames[i]
            ));
        } else {
            artists.push(React.createElement(
                "span",
                { key: props.artistNames[i] },
                React.createElement(
                    "a",
                    { href: "/artists/?id=" + props.artistIds[i] },
                    props.artistNames[i]
                ),
                ", "
            ));
        }
    }
    return React.createElement(
        "div",
        { className: "card forthcomingElement" },
        React.createElement("img", { src: props.artUrl, className: "card-img-top", alt: props.title }),
        React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
                "h5",
                { className: "card-title" },
                props.title
            ),
            React.createElement(
                "p",
                null,
                new Date(props.releaseDate).toDateString()
            ),
            React.createElement(
                "p",
                { className: "card-text" },
                props.desc
            )
        )
    );
}

var ForthcomingFeed = function (_React$Component) {
    _inherits(ForthcomingFeed, _React$Component);

    function ForthcomingFeed(props) {
        _classCallCheck(this, ForthcomingFeed);

        var _this = _possibleConstructorReturn(this, (ForthcomingFeed.__proto__ || Object.getPrototypeOf(ForthcomingFeed)).call(this, props));

        _this.state = { retreivedItems: false };
        return _this;
    }

    _createClass(ForthcomingFeed, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch('/static/data/forthcoming.json', { method: 'GET' }).then(function (res) {
                return res.json();
            }).then(function (resJson) {
                _this2.setState({ retreivedItems: true, releases: resJson });
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.retreivedItems) {
                return React.createElement("div", { className: "loader" });
            } else {
                // TODO: For each 2 tracks, wrap in a card-deck div!

                var tracks = this.state.releases.map(function (track) {
                    return React.createElement(ForthcomingTrackElement, {
                        title: track.title,
                        artistNames: track.artistNames,
                        artistIds: track.artistIds,
                        releaseDate: track.releaseDate,
                        desc: track.desc,
                        artUrl: track.artUrl,
                        key: track.title
                    });
                });
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "card-deck" },
                        tracks
                    )
                );
            }
        }
    }]);

    return ForthcomingFeed;
}(React.Component);

var domContainer = document.querySelector('#forthcomingFeed');
ReactDOM.render(e(ForthcomingFeed), domContainer);