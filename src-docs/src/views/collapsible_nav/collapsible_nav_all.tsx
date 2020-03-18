import React, { useState } from 'react';
import _ from 'lodash';

import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
} from '../../../../src/components/collapsible_nav';
import {
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiHeader,
} from '../../../../src/components/header';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiButtonEmpty } from '../../../../src/components/button';
import { EuiPage } from '../../../../src/components/page';
import {
  EuiPinnableListGroup,
  EuiListGroupItem,
  EuiPinnableListGroupItemProps,
} from '../../../../src/components/list_group';
import { EuiFlexItem } from '../../../../src/components/flex';
import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import { GuideFullScreen } from '../../services/full_screen/full_screen';

import {
  DeploymentsGroup,
  KibanaNavLinks,
  SecurityGroup,
} from './collapsible_nav_list';

const TopLinks = [
  { label: 'Home', iconType: 'home', isActive: true, 'aria-current': true },
];
const KibanaLinks: EuiPinnableListGroupItemProps[] = KibanaNavLinks.map(
  link => {
    return {
      ...link,
      href: '#/navigation/collapsible-nav',
    };
  }
);
const LearnLinks: EuiPinnableListGroupItemProps[] = [
  { label: 'Docs', href: '#/navigation/collapsible-nav' },
  { label: 'Blogs', href: '#/navigation/collapsible-nav' },
  { label: 'Webinars', href: '#/navigation/collapsible-nav' },
  { label: 'Elastic.co', href: 'https://elastic.co' },
];

export default () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false
  );

  /**
   * Accordion toggling
   */
  const [openGroups, setOpenGroups] = useState(
    JSON.parse(String(localStorage.getItem('openNavGroups'))) || [
      'Kibana',
      'Learn',
    ]
  );

  // Save which groups are open and which are not with state and local store
  const toggleAccordion = (isOpen: boolean, title?: string) => {
    if (!title) return;
    const itExists = openGroups.includes(title);
    if (isOpen) {
      if (itExists) return;
      openGroups.push(title);
    } else {
      const index = openGroups.indexOf(title);
      if (index > -1) {
        openGroups.splice(index, 1);
      }
    }
    setOpenGroups([...openGroups]);
    localStorage.setItem('openNavGroups', JSON.stringify(openGroups));
  };

  /**
   * Pinning
   */
  const [pinnedItems, setPinnedItems] = useState<
    EuiPinnableListGroupItemProps[]
  >(JSON.parse(String(localStorage.getItem('pinnedItems'))) || []);

  const addPin = (item: any) => {
    if (!item || _.find(pinnedItems, { label: item.label })) {
      return;
    }
    item.pinned = true;
    const newPinnedItems = pinnedItems ? pinnedItems.concat(item) : [item];
    setPinnedItems(newPinnedItems);
    localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
  };

  const removePin = (item: any) => {
    const pinIndex = _.findIndex(pinnedItems, { label: item.label });
    if (pinIndex > -1) {
      item.pinned = false;
      const newPinnedItems = pinnedItems;
      newPinnedItems.splice(pinIndex, 1);
      setPinnedItems([...newPinnedItems]);
      localStorage.setItem('pinnedItems', JSON.stringify(newPinnedItems));
    }
  };

  function alterLinksWithCurrentState(
    links: EuiPinnableListGroupItemProps[],
    showPinned = false
  ): EuiPinnableListGroupItemProps[] {
    return links.map(link => {
      const { pinned, ...rest } = link;
      return {
        pinned: showPinned ? pinned : false,
        ...rest,
      };
    });
  }

  const renderMenuTrigger = () => {
    return (
      <EuiHeaderSectionItemButton
        aria-label="Open nav"
        onClick={() => setNavIsOpen(!navIsOpen)}>
        <EuiIcon type={'menu'} size="m" />
      </EuiHeaderSectionItemButton>
    );
  };

  const leftSectionItems = [
    <EuiHeaderLogo iconType="logoElastic">Elastic</EuiHeaderLogo>,
  ];

  if (!navIsDocked) {
    leftSectionItems.unshift(renderMenuTrigger());
  }

  return (
    <GuideFullScreen isFullScreen={isFullScreen}>
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: leftSectionItems,
            borders: 'right',
          },
          {
            items: [
              <EuiButtonEmpty
                iconType="minimize"
                onClick={() => setIsFullScreen(false)}>
                Exit full screen
              </EuiButtonEmpty>,
            ],
          },
        ]}
      />

      {navIsOpen && (
        <EuiCollapsibleNav
          docked={navIsDocked}
          onClose={() => setNavIsOpen(false)}>
          {/* Dark deployments section */}
          <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
            {DeploymentsGroup}
          </EuiFlexItem>

          {/* Shaded pinned section always with a home item */}
          <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
            <EuiCollapsibleNavGroup
              background="light"
              className="eui-yScroll"
              style={{ maxHeight: '40vh' }}>
              <EuiPinnableListGroup
                listItems={alterLinksWithCurrentState(TopLinks).concat(
                  alterLinksWithCurrentState(pinnedItems, true)
                )}
                onPinClick={removePin}
                maxWidth="none"
                color="subdued"
                gutterSize="none"
                size="s"
              />
            </EuiCollapsibleNavGroup>
          </EuiFlexItem>

          <EuiHorizontalRule margin="none" />

          {/* BOTTOM */}
          <EuiFlexItem className="eui-yScroll">
            {/* Kibana section */}
            <EuiCollapsibleNavGroup
              title="Kibana"
              iconType="logoKibana"
              isCollapsible={true}
              initialIsOpen={openGroups.includes('Kibana')}
              onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Kibana')}>
              <EuiPinnableListGroup
                listItems={alterLinksWithCurrentState(KibanaLinks)}
                onPinClick={addPin}
                maxWidth="none"
                color="subdued"
                gutterSize="none"
                size="s"
              />
            </EuiCollapsibleNavGroup>

            {/* Security callout */}
            {SecurityGroup}

            {/* Learn section */}
            <EuiCollapsibleNavGroup
              title="Learn"
              iconType="training"
              isCollapsible={true}
              initialIsOpen={openGroups.includes('Learn')}
              onToggle={(isOpen: boolean) => toggleAccordion(isOpen, 'Learn')}>
              <EuiPinnableListGroup
                listItems={alterLinksWithCurrentState(LearnLinks)}
                onPinClick={addPin}
                maxWidth="none"
                color="subdued"
                gutterSize="none"
                size="s"
              />
            </EuiCollapsibleNavGroup>

            {/* Docking button */}
            <EuiCollapsibleNavGroup>
              <EuiListGroupItem
                size="xs"
                color="subdued"
                label={`${navIsDocked ? 'Undock' : 'Dock'} navigation`}
                onClick={() => {
                  setNavIsDocked(!navIsDocked);
                  localStorage.setItem(
                    'navIsDocked',
                    JSON.stringify(!navIsDocked)
                  );
                }}
                iconType={navIsDocked ? 'lock' : 'lockOpen'}
              />
            </EuiCollapsibleNavGroup>
          </EuiFlexItem>
        </EuiCollapsibleNav>
      )}

      <EuiPage className="guideFullScreenOverlay" />
    </GuideFullScreen>
  );
};
