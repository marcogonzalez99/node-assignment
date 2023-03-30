# COMP 4513 (Winter 2023)
### Assignment #2: Node, MongoDB, Simple Authentication

# Homepage URL - https://node-assignment-1.glitch.me/

# Github URL - https://github.com/marcogonzalez99/node-assignment

# ---------------------------------------------
# Movies Cases
# ---------------------------------------------

# /api/movies - https://node-assignment-1.glitch.me/api/movies





# -------------------------------------------------------------------------------------------
# Limit Cases
# ---------------------------------------------

# 1 - https://node-assignment-1.glitch.me/api/movies/limit/1
# 200 - https://node-assignment-1.glitch.me/api/movies/limit/200
# 145 - https://node-assignment-1.glitch.me/api/movies/limit/145

# ---------------------------------------------
# Non-working Limit Cases
# ---------------------------------------------

# -10 - https://node-assignment-1.glitch.me/api/movies/limit/-10
# 201 - https://node-assignment-1.glitch.me/api/movies/limit/201
# -------------------------------------------------------------------------------------------





# -------------------------------------------------------------------------------------------
# ID Cases
# ---------------------------------------------

# ID that returns a match - https://node-assignment-1.glitch.me/api/movies/13
# ID that returns a match - https://node-assignment-1.glitch.me/api/movies/2126

# ---------------------------------------------
# Non-working ID Cases
# ---------------------------------------------

# ID that returns no match - https://node-assignment-1.glitch.me/api/movies/1
# ID that returns no match - https://node-assignment-1.glitch.me/api/movies/151
# -------------------------------------------------------------------------------------------





# -------------------------------------------------------------------------------------------
# TMDB Cases
# ---------------------------------------------

# TMDB that returns a match - https://node-assignment-1.glitch.me/api/movies/tmdb/28
# TMDB that returns a match - https://node-assignment-1.glitch.me/api/movies/tmdb/238

# ---------------------------------------------
# Non-working TMDB Cases
# ---------------------------------------------

# TMDB that returns no match - https://node-assignment-1.glitch.me/api/movies/tmdb/421
# TMDB that returns no match - https://node-assignment-1.glitch.me/api/movies/tmdb/12414
# -------------------------------------------------------------------------------------------





# -------------------------------------------------------------------------------------------
# Year Cases
# ---------------------------------------------

# Year that returns matches - https://node-assignment-1.glitch.me/api/movies/year/1990/2000
# Second year that returns matches - https://node-assignment-1.glitch.me/api/movies/year/1940/1950

# ---------------------------------------------
# Non-working Year Cases
# ---------------------------------------------

# Year that contains string - https://node-assignment-1.glitch.me/api/movies/year/nineteen-ninety-nine/two-thousand-one
# Year that is out of range - https://node-assignment-1.glitch.me/api/movies/year/2000/1998
# Year that is out of bounds - https://node-assignment-1.glitch.me/api/movies/year/1900/2051
# Another year that is out of bounds - https://node-assignment-1.glitch.me/api/movies/year/1890/2020
# Year that does not make sense - https://node-assignment-1.glitch.me/api/movies/year/320/20000
# -------------------------------------------------------------------------------------------





# -------------------------------------------------------------------------------------------
# Ratings Cases
# ---------------------------------------------

# Average rating that returns match - https://node-assignment-1.glitch.me/api/movies/ratings/5/7
# Average rating that returns match - https://node-assignment-1.glitch.me/api/movies/ratings/8/9

# ---------------------------------------------
# Non-working Ratings Cases
# ---------------------------------------------

# Average rating that returns no matches - https://node-assignment-1.glitch.me/api/movies/ratings/1/2
# Average rating that is out of range - https://node-assignment-1.glitch.me/api/movies/ratings/1/11
# Averge rating that is out of order - https://node-assignment-1.glitch.me/api/movies/ratings/5/3
# -------------------------------------------------------------------------------------------





# -------------------------------------------------------------------------------------------
# Title Cases
# ---------------------------------------------

# Title that returns matches - https://node-assignment-1.glitch.me/api/movies/title/harry
# Title partial match returning matches - https://node-assignment-1.glitch.me/api/movies/title/ap

# ---------------------------------------------
# Non-working Title Cases
# ---------------------------------------------

# Title that returns no matches - https://node-assignment-1.glitch.me/api/movies/title/apf
# Title that does not exist - https://node-assignment-1.glitch.me/api/movies/title/aladdin
# -------------------------------------------------------------------------------------------





# -------------------------------------------------------------------------------------------
# Genre Cases
# ---------------------------------------------

# Genre that returns matches - https://node-assignment-1.glitch.me/api/movies/genre/thriller
# Genre partial match returning matches - https://node-assignment-1.glitch.me/api/movies/genre/act

# ---------------------------------------------
# Non-working Genre Cases
# ---------------------------------------------

# Genre that does not return any matches - https://node-assignment-1.glitch.me/api/movies/genre/musical
# Genre partial match returning no matches - https://node-assignment-1.glitch.me/api/movies/genre/hro
# -------------------------------------------------------------------------------------------