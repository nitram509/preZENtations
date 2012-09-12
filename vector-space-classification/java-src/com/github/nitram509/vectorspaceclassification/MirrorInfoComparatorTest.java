/*******************************************************************************
 * Copyright (c) 2008, 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     martin.kirst@s1998.tu-chemnitz.de - fixed and improved sort algorithm
 *******************************************************************************/
package com.github.nitram509.vectorspaceclassification;

import static java.lang.Math.abs;
import static java.lang.Math.max;
import static java.lang.Math.min;
import static java.util.Collections.reverse;
import static org.testng.FileAssert.fail;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MirrorInfoComparatorTest {

  private final List<MirrorInfo> REFERENCE_SORTED_MIRRORS = new ArrayList<MirrorInfo>();

  private MirrorInfoComparator mirrorInfoComparator;

  @BeforeClass
  public void setup() {
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(224906, 1, 3, "http://ftp.wh2.tu-dresden.de/pub/mirrors/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(125868, 1, 1, "http://ftp-stud.fht-esslingen.de/pub/Mirrors/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(199719, 2, 0, "http://mirror.netcologne.de/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(132379, 1, 5, "http://mirror.selfnet.de/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(137107, 1, 7, "http://mirror.switch.ch/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(128472, 1, 8, "http://www.rcp-vision.com/eclipse/eclipseMirror"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(129359, 2, 10, "http://eclipse.mirror.garr.it/mirrors/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(59587, 1, 6, "http://ftp.roedu.net/pub/mirrors/eclipse.org"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(85624, 1, 9, "http://giano.com.dist.unige.it/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(149572, 2, 19, "http://ftp.roedu.net/mirrors/eclipse.org"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(105858, 1, 18, "http://ftp.ing.umu.se/mirror/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(67202, 1, 15, "http://mirrors.fe.up.pt/pub/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(68067, 1, 17, "http://ftp.heanet.ie/pub/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(73659, 1, 21, "http://ftp.sh.cvut.cz/mirrors/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(73446, 1, 22, "http://ftp.man.poznan.pl/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(45175, 1, 16, "http://eclipse.dcc.fc.up.pt"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(61443, 1, 23, "http://eclipse.nordnet.fi/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(57637, 1, 26, "http://www.gtlib.gatech.edu/pub/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(35928, 1, 28, "http://ftp.osuosl.org/pub/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(40683, 0, 32, "http://mirrors.med.harvard.edu/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(34207, 2, 31, "http://mirrors.ibiblio.org/pub/mirrors/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(31402, 1, 33, "http://ftp.ussg.iu.edu/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(24147, 1, 29, "http://mirrors.xmission.com/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(-1, 0, 34, "http://ftp.osuosl.org/pub/eclipse"));
    REFERENCE_SORTED_MIRRORS.add(new MirrorInfo(-1, 0, 40, "http://www.ftp.saix.net/Eclipse"));
  }

  @BeforeMethod
  public void initialize_MirrorInfoComparator_aka_compute_centroid_or_prototype_vector() {
    mirrorInfoComparator = computeAndSetReferenceVectorForComparatorWith(REFERENCE_SORTED_MIRRORS);
  }

  private MirrorInfoComparator computeAndSetReferenceVectorForComparatorWith(List<MirrorInfo> anyMirrorServerList) {
    long maxBytesPerSecond = 0;
    for (MirrorInfo mi : anyMirrorServerList) {
      maxBytesPerSecond = max(maxBytesPerSecond, mi.bytesPerSecond);
    }
    int bestInitialRank = 1;
    int bestFailureCount = 0;
    return new MirrorInfoComparator(maxBytesPerSecond, bestFailureCount, bestInitialRank);
  }

  @Test
  public void a_reversed_List_should_be_sorted_to_reference_order() {
    ArrayList<MirrorInfo> mirrors = createCopyWithReverseOrderFrom(REFERENCE_SORTED_MIRRORS);
    Collections.sort(mirrors, mirrorInfoComparator);
    org.testng.Assert.assertEquals(mirrors, REFERENCE_SORTED_MIRRORS);
  }

  private ArrayList<MirrorInfo> createCopyWithReverseOrderFrom(List<MirrorInfo> aList) {
    ArrayList<MirrorInfo> result = new ArrayList<MirrorInfo>();
    result.addAll(aList);
    reverse(result);
    return result;
  }
}
