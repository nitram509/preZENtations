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

import java.util.Comparator;

import static java.lang.Math.abs;
import static java.lang.Math.sqrt;

public class MirrorInfoComparator implements Comparator<MirrorInfo> {

  /**
   * This weight is used to treat speed attribute in 25kByte steps.
   */
  static final double WEIGHT_BYTES_PER_SECOND = 1d / 25000d;
  /**
   * This weight influences the failureCount classification
   * Value was calculated by empirical tests.
   */
  static final double WEIGHT_FAILURE_COUNT = 1.75d;

  final double qBytesPerSeconds;
  final double qFailureCount;
  final double qRank;
  final double qel; // euclidean length

  public MirrorInfoComparator(long qBytesPerSeconds, int qFailureCount, int qRank) {
    // Query: bytesPerSecondond=max + 10%, failureCountr=0, rank=1
    this.qBytesPerSeconds = (qBytesPerSeconds + qBytesPerSeconds / 10) * WEIGHT_BYTES_PER_SECOND;
    this.qFailureCount = qFailureCount;
    this.qRank = qRank;
    this.qel = sqrt(qBytesPerSeconds * qBytesPerSeconds + (qFailureCount * 1d) * (qFailureCount * 1d) + qRank * qRank);
  }

  public int compare(MirrorInfo o1, MirrorInfo o2) {
    if (o1 == o2) {
      return 0; // shortest way
    }
    // euclidean lengths
    double o1_el = sqrt(abs(o1.bytesPerSecond * WEIGHT_BYTES_PER_SECOND) * abs(o1.bytesPerSecond * WEIGHT_BYTES_PER_SECOND) + (o1.failureCount * WEIGHT_FAILURE_COUNT) * (o1.failureCount * WEIGHT_FAILURE_COUNT) + o1.initialRank * o1.initialRank);
    double o2_el = sqrt(abs(o2.bytesPerSecond * WEIGHT_BYTES_PER_SECOND) * abs(o2.bytesPerSecond * WEIGHT_BYTES_PER_SECOND) + (o2.failureCount * WEIGHT_FAILURE_COUNT) * (o2.failureCount * WEIGHT_FAILURE_COUNT) + o2.initialRank * o2.initialRank);
    // vector dot products
    double dp_1 = (qBytesPerSeconds * abs(o1.bytesPerSecond * WEIGHT_BYTES_PER_SECOND) + qFailureCount * (o1.failureCount * WEIGHT_FAILURE_COUNT) + qRank * o1.initialRank);
    double dp_2 = (qBytesPerSeconds * abs(o2.bytesPerSecond * WEIGHT_BYTES_PER_SECOND) + qFailureCount * (o2.failureCount * WEIGHT_FAILURE_COUNT) + qRank * o2.initialRank);
    // similarities from o1 to Q and o2 to Q (where q=query)
    double sim1 = dp_1 / (qel * o1_el);
    double sim2 = dp_2 / (qel * o2_el);
    return new Double(sim2).compareTo(new Double(sim1));
  }

}