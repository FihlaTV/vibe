// Copyright 2002-2015, University of Colorado Boulder

/**
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Sound = require( 'VIBE/Sound' );

  // constants
  var BUTTON_FONT = new PhetFont( { size: 20 } );
  var EMBEDDED_SOUND = new Sound(
    [
      { base64: 'data:audio/mpeg;base64,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' },
      { base64: 'data:audio/ogg;base64,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' }
    ]
  );
  var RELATIVE_PATH_SOUND = new Sound( [ { url: 'audio/relative-path-sound.mp3' }, { url: 'audio/relative-path-sound.ogg' } ] );

  /**
   * @param {VibeModel} vibeModel
   * @constructor
   */
  function VibeScreenView( vibeModel ) {

    ScreenView.call( this );

    // blurb with some info
    var blurb = new Text( 'Demo/Test of the Vibe library, which is for sound generation.', {
      font: new PhetFont( 20 ),
      top: 20,
      left: 20
    } );
    this.addChild( blurb );

    var playEmbeddedAudioButton = new RectangularPushButton( {
      content: new Text( 'Play Embedded Audio', { font: BUTTON_FONT } ),
      baseColor: 'rgb( 204, 102, 204 )',
      top: blurb.bottom + 10,
      left: blurb.left,
      listener: function() {
        EMBEDDED_SOUND.stop(); // just in case it's already playing
        EMBEDDED_SOUND.play();
      }
    } );
    this.addChild( playEmbeddedAudioButton );

    var playRelativePathAudioButton = new RectangularPushButton( {
      content: new Text( 'Play Relative Path Audio', { font: BUTTON_FONT } ),
      baseColor: 'rgb( 245, 184, 0 )',
      top: playEmbeddedAudioButton.bottom + 10,
      left: blurb.left,
      listener: function() {
        RELATIVE_PATH_SOUND.stop(); // just in case it's already playing
        RELATIVE_PATH_SOUND.play();
      }
    } );
    this.addChild( playRelativePathAudioButton );

    var playInAnimationFrameButton = new RectangularPushButton( {
      content: new Text( 'Play in Animation Frame (delayed)', { font: BUTTON_FONT } ),
      baseColor: '#A0D022',
      top: playRelativePathAudioButton.bottom + 10,
      left: blurb.left,
      listener: function() {
        var start = Date.now();
        var played = false;
        (function animationLoop() {
          var now = Date.now();
          if ( now - start > 500 && !played ) {
            EMBEDDED_SOUND.play();
            played = true;
          }
          else {
            window.requestAnimationFrame( animationLoop );
          }
        })()
      }
    } );
    this.addChild( playInAnimationFrameButton );

  }

  return inherit( ScreenView, VibeScreenView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );