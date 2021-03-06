import Ember from 'ember';
import SizeableMixin from 'ember-shell/mixins/behavior/sizeable';
import PositionableMixin from 'ember-shell/mixins/behavior/positionable';
import PressableMixin from 'ember-shell/mixins/behavior/pressable';

export default Ember.Mixin.create(SizeableMixin, PressableMixin, {

  tagName: 'panel-item',
  allowMultiple: false,

});
