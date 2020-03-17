module Main exposing (..)

import Browser
import Html exposing (Html, a, code, div, img, p, text)
import Html.Attributes exposing (class, href, rel, src, target)



---- MODEL ----


type alias Model =
    {}


init : ( Model, Cmd Msg )
init =
    ( {}, Cmd.none )



---- UPDATE ----


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    div [ class "<%= name %>" ]
        [ img [ src "https://elm-lang.org/favicon.ico" ] []
        , p []
            [ text "Edit "
            , code [] [ text "src/Main.elm" ]
            , text " and save to reload."
            ]
        , a
            [ href "https://guide.elm-lang.org/"
            , target "_blank"
            , rel "noopener noreferrer"
            ]
            [ text "Learn Elm" ]
        ]



---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = always Sub.none
        }
