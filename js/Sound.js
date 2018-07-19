// Copyright 2013-2017, University of Colorado Boulder

/**
 * Type for loading and playing sounds, works on multiple platforms and supports embedded base64 data.  This uses Web
 * Audio when available, primarily because the webkit platforms were failing with cross-domain errors when attempting to
 * load audio data from embedded data URIs.  This was occurring in mid-September 2013.  Simplification may be possible
 * if the cross-domain issue goes away at some point in the future.
 */
define( function( require ) {
  'use strict';

  // modules
  var vibe = require( 'VIBE/vibe' );
  var soundManager = require( 'TAMBO/soundManager' );
  var OneShotSoundClip = require( 'TAMBO/sound-generators/OneShotSoundClip' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Object} soundInfo - An object that includes *either* a url that points to the sound to be played *or* a
   * base64-encoded version of the sound data.  The former is generally used when a sim is running in RequireJS mode,
   * the latter is used in built versions.
   * @constructor
   */
  function Sound( soundInfo ) {
    OneShotSoundClip.call( this, soundInfo );

    if ( !soundManager.isInitialized() ) {
      soundManager.initialize( new BooleanProperty( true ), {} );
      soundManager.setReverbLevel( 0 );
    }
    soundManager.addSoundGenerator( this );
  }

  vibe.register( 'Sound', Sound );

  inherit( OneShotSoundClip, Sound, {}, {

    // @public, @static, global control for audio on/off
    audioEnabledProperty: soundManager.enabledProperty
  } );

  return Sound;
} );