export default {
  locale: {
    'auto': 'System',
    'en': 'English',
    'zh-hans': 'Chinese',
  },
  home: {
    title: 'frame-uniapp-ui',
    subtitle: 'A clean UI kit built for this starter template.',
    themeToggle: {
      label: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    library: {
      badge: 'Composable primitives',
      title: 'Launch polished mini apps quickly',
      description: 'Each component focuses on the most common admin workflows so you can stay productive on every platform.',
      highlights: {
        titles: {
          design: 'Design system',
          theme: 'Dark mode',
          quality: 'Experience',
        },
        design: 'BEM class names and Sass variables keep the look consistent.',
        theme: 'Native dark mode works out-of-the-box for every component.',
        quality: 'Interactions are tuned to feel just like premium design systems.',
      },
    },
    components: {
      title: 'Component showcase',
      subtitle: 'Browse the frame-uniapp-ui primitives. Tap a card to open its playground and usage notes.',
      badgeNew: 'New',
      button: {
        name: 'Button',
        desc: 'Gradient-ready button with variants, states, and slots.',
      },
    },
    actions: {
      docs: 'Read the uni-app documentation',
      repo: 'View the template repository',
      privacy: 'Review the privacy notice',
      open: 'Open',
      copyTip: 'Link copied. Open it in your browser.',
    },
    privacy: {
      title: 'Privacy notice summary',
      subtitle: 'Please review how we request permissions and process data before continuing.',
      confirm: 'Agree and continue',
      cancel: 'Maybe later',
      agreeTip: 'Thanks for confirming the privacy policy.',
      disagreeTip: 'You can reopen the privacy notice at any time.',
    },
  },
  components: {
    button: {
      title: 'Frame button',
      description: 'The frame button adapts instantly to base, outline, dashed, and text variants, supports ghost style with built-in loading states.',
      sections: {
        variants: 'Variants',
        states: 'States',
        sizes: 'Sizes',
        api: 'Props',
      },
      variants: {
        base: 'Base',
        outline: 'Outline',
        dashed: 'Dashed',
        text: 'Text',
        ghost: 'Ghost',
      },
      states: {
        loading: 'Loading',
        disabled: 'Disabled',
      },
      sizes: {
        small: 'Compact',
        medium: 'Default',
        large: 'Large',
      },
      api: {
        variant: 'base | outline | dashed | text',
        theme: 'default | primary | success | warning | danger',
        size: 'small | medium | large',
        shape: 'rounded | pill | square',
        block: 'Expands to full width when true.',
        ghost: 'Ghost button (hollow button).',
        loading: 'Shows the spinner and blocks clicks.',
        disabled: 'Disables pointer events and styles.',
      },
    },
  },
};
