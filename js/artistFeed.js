// artistFeed.js
// The artist component which renders a list of artists.
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

function ArtistCardElement(props) {
    return React.createElement(
        "div",
        { className: "card artistElement" },
        React.createElement("img", { src: props.coverImgUrl, className: "card-img-top", alt: props.name }),
        React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
                "h5",
                { className: "card-title" },
                props.name
            ),
            React.createElement(
                "p",
                { className: "card-text" },
                props.shortDesc
            ),
            React.createElement(
                "a",
                { href: "?id=" + props.id, className: "btn btn-outline-danger" },
                "more info"
            )
        )
    );
};

function ArtistPage(props) {
    // Search through releases to find ones by the artist.
    var artistReleases = [];
    var firstRelease = true;
    for (var i = 0; i < props.releases.length; i++) {
        if (props.releases[i]['artistId'] == props.id) {
            if (firstRelease) {
                artistReleases.push(React.createElement(
                    "div",
                    { className: "carousel-item active", key: props.releases[i].title },
                    React.createElement("iframe", { width: "100%", height: "166", scrolling: "no", frameBorder: "no", allow: "autoplay", src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + props.releases[i].sctrackid + "&color=%23d0021b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" })
                ));
                firstRelease = false;
            } else {
                artistReleases.push(React.createElement(
                    "div",
                    { className: "carousel-item", key: props.releases[i].title },
                    React.createElement("iframe", { width: "100%", height: "166", scrolling: "no", frameBorder: "no", allow: "autoplay", src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + props.releases[i].sctrackid + "&color=%23d0021b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" })
                ));
            }
        }
    }

    return React.createElement(
        "div",
        { className: "artistProfile" },
        React.createElement(
            "div",
            { className: "row artistProfileHeadline" },
            React.createElement(
                "h1",
                { className: "card-title col" },
                props.name
            ),
            React.createElement(
                "div",
                { className: "row col artistSocials" },
                React.createElement(
                    "a",
                    { className: "artistSocialLink", href: "https://soundcloud.com/" + props.soundcloud },
                    React.createElement("i", { className: "fab fa-soundcloud artistSocialIcon" })
                ),
                React.createElement(
                    "a",
                    { className: "artistSocialLink", href: "https://instagram.com/" + props.instagram },
                    React.createElement("i", { className: "fab fa-instagram artistSocialIcon" })
                )
            )
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "p",
                null,
                props.desc
            )
        ),
        React.createElement(
            "h3",
            null,
            "Tracks"
        ),
        React.createElement(
            "div",
            { id: "trackCarousel", className: "carousel slide", "data-ride": "carousel" },
            React.createElement(
                "div",
                { className: "carousel-inner" },
                artistReleases
            ),
            React.createElement(
                "a",
                { className: "carousel-control-prev", href: "#trackCarousel", role: "button", "data-slide": "prev" },
                React.createElement("span", { className: "carousel-control-prev-icon", "aria-hidden": "true" }),
                React.createElement(
                    "span",
                    { className: "sr-only" },
                    "Previous"
                )
            ),
            React.createElement(
                "a",
                { className: "carousel-control-next", href: "#trackCarousel", role: "button", "data-slide": "next" },
                React.createElement("span", { className: "carousel-control-next-icon", "aria-hidden": "true" }),
                React.createElement(
                    "span",
                    { className: "sr-only" },
                    "Next"
                )
            )
        )
    );
}

var ArtistFeed = function (_React$Component) {
    _inherits(ArtistFeed, _React$Component);

    function ArtistFeed(props) {
        _classCallCheck(this, ArtistFeed);

        var _this = _possibleConstructorReturn(this, (ArtistFeed.__proto__ || Object.getPrototypeOf(ArtistFeed)).call(this, props));

        _this.state = { retrievedItems: false, artistSpotlight: null, releases: [] };
        return _this;
    }

    _createClass(ArtistFeed, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            // Get artist info.
            fetch('/static/artists.json', { method: 'GET' }).then(function (res) {
                return res.json();
            }).then(function (resJson) {
                _this2.setState({ retrievedItems: true, artists: resJson });
                // If artistid param in url, show artist spotlight.
                if (Object.keys(resJson).includes(getParams(window.location.href).id)) {
                    _this2.setState({ artistSpotlight: getParams(window.location.href).id });
                }
            }).catch(function (error) {
                console.error(error);
            });

            // Get releases
            fetch('/static/releases.json', { method: 'GET' }).then(function (res) {
                return res.json();
            }).then(function (resJson) {
                _this2.setState({ releases: resJson });
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            console.log(this.state.artistSpotlight);
            if (!this.state.retrievedItems) {
                return React.createElement(
                    "div",
                    { className: "loaderWrapper" },
                    React.createElement("div", { className: "loader" })
                );
            } else if (this.state.artistSpotlight !== null) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(ArtistPage, Object.assign({
                        id: this.state.artistSpotlight
                    }, this.state.artists[this.state.artistSpotlight], {
                        releases: this.state.releases
                    }))
                );
            } else {
                var artists = Object.keys(this.state.artists).map(function (key, index) {
                    return React.createElement(ArtistCardElement, Object.assign({
                        id: key,
                        key: key
                    }, _this3.state.artists[key]));
                });
                return React.createElement(
                    "div",
                    { className: "artistCardsWrapper" },
                    artists
                );
            }
        }
    }]);

    return ArtistFeed;
}(React.Component);

var getParams = function getParams(url) {
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

var domContainer = document.querySelector('#artistFeed');
ReactDOM.render(e(ArtistFeed), domContainer);