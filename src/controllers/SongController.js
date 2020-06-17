var SpotifyWebApi = require('spotify-web-api-node');

const SongController = {
    async test(req, res) {
        const authorization = req.headers.authorization
        const accessToken = authorization.split("Bearer ").pop()

        var spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(accessToken)
        
        spotifyApi.getMyCurrentPlaybackState()
        .then(function(data) {
            res.status(200).json(data.body);
        }, function(err) {
            res.status(500).json(err);
        });
    },
    async findSuggested(req, res) {
        const authorization = req.headers.authorization
        const accessToken = authorization.split("Bearer ").pop()

        var spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(accessToken)
        
        spotifyApi.getMyTopTracks({
            limit : 10,
            offset: 1
          })
        .then(function(data) {
            console.info(data.body)
            res.status(200).json(data.body);
        }, function(err) {
            res.status(500).json(err);
        });
    }
}

module.exports = SongController;